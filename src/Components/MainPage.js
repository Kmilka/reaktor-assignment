import { useState, useEffect } from "react";

import "../App.css";
import { fetchData } from "../utils/api";
import { formatPayload } from "../utils/workAround";

import Scroll from "./Scroll";
import CardList from "./CardList";
import Switcher from "./Switcher";
import Loading from "./Loading";

function MainPage() {
  const productCategories = ["jackets", "shirts", "accessories"];
  const initialCategory = "shirts";

  let [products, setProducts] = useState([]);
  let [categoryOnDisplay, setCategoryOnDisplay] = useState(initialCategory);
  let [manufacturers, setManufacturers] = useState([]);
  let [loadingStatus, setloadingStatus] = useState(true);
  let [fetchIndicator, setfetchIndicator] = useState(-1);
  let [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, [categoryOnDisplay]);

  useEffect(() => {
    if (!loadingStatus) {
      fetchAvailability();
    }
    // eslint-disable-next-line
  }, [fetchIndicator]);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  // fetch products in the chosen category and update the State
  const fetchProduct = () => {
    let manufacturers = new Set();
    fetchData(`products/${categoryOnDisplay}`)
      .then((data) => {
        data.forEach((item) => manufacturers.add(item.manufacturer));
        setProducts(data);
        setloadingStatus(false);
        setManufacturers([...manufacturers]);
        setfetchIndicator(0);
      })
      .catch((err) => {
        setError(err);
      });
  };

  //  fetch availability of the manufacturer, then upload it to products array and update the State
  const fetchAvailability = () => {
    if (fetchIndicator === manufacturers.length) {
      return;
    } else {
      const manufacturer = manufacturers[fetchIndicator];
      fetchData(`availability/${manufacturer}`)
        .then((data) => {
          const availability = data.response;
          // go through the products array and search for the same id in the availability array, which was just fetched
          for (let index = 0; index < products.length; index++) {
            if (products[index].manufacturer === manufacturer) {
              const availabilityInfo = availability.find(
                (one) => products[index].id === one.id.toLowerCase()
              );
              if (availabilityInfo !== undefined) {
                // work-around: format data from the source
                const productAvailability = formatPayload(
                  availabilityInfo.DATAPAYLOAD
                );

                // upload availability info to product
                products[index].availability = productAvailability;
              }
            } else {
              continue;
            }
          }
          setProducts(products);
          setfetchIndicator(fetchIndicator + 1);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  // is invoked when user changes product category by pressing the button with the category name on it
  const switchCategory = (newCategory) => {
    setCategoryOnDisplay(newCategory);
    setloadingStatus(true);
  };

  return (
    <div>
      <Switcher
        categoryOnDisplay={categoryOnDisplay}
        categories={productCategories}
        switchCategory={switchCategory}
      />
      {loadingStatus ? (
        <Loading />
      ) : (
        <Scroll>
          <CardList list={products} />
        </Scroll>
      )}
    </div>
  );
}

export default MainPage;
