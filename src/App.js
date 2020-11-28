import { Component } from "react";

import "./App.css";
import fetchData from "./utils/API";

import Scroll from "./Components/Scroll";
import CardList from "./Components/CardList";
import Switcher from "./Components/Switcher";
import Loading from "./Components/Loading";

const productCategories = ["jackets", "shirts", "accessories"];
const initialCategory = "shirts";

class App extends Component {
  constructor() {
    super();
    this.state = {
      productCategories,
      categoryOnDisplay: initialCategory,
      products: [],
      manufacturers: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchProduct(initialCategory);
  }

  componentDidUpdate() {
    // availability info for products is fetched from separate API /availability/:manufacterer
    if (this.state.manufacturers.length) {
      this.fetchAvailability(this.state.manufacturers[0]);
    }
  }

  // fetch products in the chosen category and update the State
  fetchProduct = (productCategory) => {
    let manufacturers = new Set();
    return fetchData(`products/${productCategory}`)
      .then((data) => {
        data.forEach((item) => manufacturers.add(item.manufacturer));
        this.setState({
          products: data,
          isLoading: false,
          manufacturers: [...manufacturers],
        });
      })
      .catch(console.log);
  };

  //  fetch availability of the manufacturer, then upload it to products array and update the State
  fetchAvailability = (manufacturer) => {
    fetchData(`availability/${manufacturer}`)
      .then((data) => {
        const availability = data.response;
        let productsWithAvailability = this.state.products;
        // go through the products array and search for the same id in the availability array, which was just fetched
        for (let index = 0; index < productsWithAvailability.length; index++) {
          if (productsWithAvailability[index].manufacturer === manufacturer) {
            const availabilityInfo = availability.find(
              (one) =>
                productsWithAvailability[index].id === one.id.toLowerCase()
            );
            if (availabilityInfo !== undefined) {
              // work-around: format data from the source
              let productAvailability = availabilityInfo.DATAPAYLOAD.replace(
                "<AVAILABILITY>\n  <INSTOCKVALUE>",
                ""
              );
              productAvailability = productAvailability.replace(
                "</INSTOCKVALUE>\n</AVAILABILITY>",
                ""
              );
              switch (productAvailability) {
                case "OUTOFSTOCK":
                  productAvailability = "OUT OF STOCK";
                  break;
                case "LESSTHAN10":
                  productAvailability = "LESS THAN 10";
                  break;
                case "INSTOCK":
                  productAvailability = "IN STOCK";
                  break;
                default:
                  break;
              }
              // upload availability info to product
              productsWithAvailability[
                index
              ].availability = productAvailability;
            }
          } else {
            continue;
          }
        }
        //update products array
        this.setState((prevState) => ({
          ...prevState,
          products: productsWithAvailability,
          // delete manufacturer from the list if availability for it was already fetchec and uploaded to products
          manufacturers: prevState.manufacturers.slice(
            1,
            prevState.manufacturers.length
          ),
        }));
      })
      .catch(console.log);
  };

  // is invoked when user changes product category by pressing the button with the category name on it
  switchCategory = (newCategory) => {
    this.setState({ categoryOnDisplay: newCategory, isLoading: true });
    this.fetchProduct(newCategory);
  };

  render() {
    return (
      <div>
        <Switcher
          categoryOnDisplay={this.state.categoryOnDisplay}
          categories={this.state.productCategories}
          switchCategory={this.switchCategory}
        />
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <Scroll>
            <CardList list={this.state.products} />
          </Scroll>
        )}
      </div>
    );
  }
}

export default App;
