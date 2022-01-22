import { useState, useEffect, useCallback } from "react";

// we use our custom hook(useFetch) to create funtionality seperated from our main component pass a
// parameter to it so that any component that wants to use it caan
// then pass in the needed argumebnt to it for use

export const useFetch = (url) => {
  // NOTE: custom hook only allow the use of use before the funtion name u want(e.g useFetch, useDelete etc.)
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    const response = await fetch(url);
    const products = await response.json();
    setProducts(products);
    setLoading(false);
  }, [url]); // recreate /make use of useCallback funtion when the url value changes

  // REGULAR FETCH without useCallback
  // const getProducts = async () => {
  //   const response = await fetch(url);
  //   const products = await response.json();
  //   setProducts(products);
  //   setLoading(false);
  // };

  // REGULAR useEffect with adding second dependency value, of useCallback
  // useEffect(() => {
  //   getProducts();
  // }, [url])// our second optional array in the useEffect will first allow the useEffect hook to run
  // when called at first and then the value passed in(url) will allow it to(update) run again when
  // the url value changes in a new component that makes use of useFetch hook we created

  useEffect(() => {
    getProducts();
  }, [url, getProducts]); // our second optional array in the useEffect will first allow the useEffect hook to run
  // when called at first and then the value passed in(url) will allow it to(update) run again when
  // the url value changes in a new component that makes use of useFetch hook we created

  return { loading, products }; // we return our collective state value
};
