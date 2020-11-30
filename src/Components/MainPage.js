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
  let [error, setError] = useState("");
  // = index shows for which element in the "manufacturers" array "fetchAvailability" function loads data now
  // values could be: -1, 0 -> manufacturers.length (included)
  let [fetchIndicator, setfetchIndicator] = useState(-1);

  useEffect(() => {
    fetchProduct();
  }, [categoryOnDisplay]);

  useEffect(() => {
    if (!loadingStatus) {
      fetchAvailability();
    }
  }, [fetchIndicator]);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  // fetch products for the categoryOnDisplay
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

  //  fetch availability for the manufacturer and upload it to products array
  const fetchAvailability = () => {
    // true == data was fetched for all manufacturers
    if (fetchIndicator === manufacturers.length) {
      return;
    } else {
      const manufacturer = manufacturers[fetchIndicator];
      fetchData(`availability/${manufacturer}`)
        .then((data) => {
          // workaround: change data.response to data
          const availability = data.response;
          // go through the products array and search for the same id in the availability array, which was just fetched
          for (let index = 0; index < products.length; index++) {
            if (products[index].manufacturer === manufacturer) {
              const availabilityInfo = availability.find(
                (one) => products[index].id === one.id.toLowerCase()
              );
              if (availabilityInfo !== undefined) {
                // workaround: format data from the source
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

  // is invoked when user changes product category by pressing the button in the Switcher
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
