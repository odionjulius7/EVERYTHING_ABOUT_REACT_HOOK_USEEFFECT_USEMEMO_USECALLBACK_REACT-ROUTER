import React, { useState, useCallback, useMemo } from "react";
import { useFetch } from "../../9-custom-hooks/final/2-useFetch";

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/javascript-store-products";

// every time props or state changes, component re-renders

const calculateMostExpensive = (data) => {
  return (
    data.reduce((total, item) => {
      // in reduce() u always return the fisrt param(accumulator). always
      const price = item.fields.price; // pass each item.filed.price to price var
      if (price >= total) {
        // then check to see if the any price is (>=total)accumulator
        // if yes give that price value to the total: note: total is set to zero
        total = price;
      }
      return total;
    }, 0) / 100 // divide by 100 to get cent
  );
};
const Index = () => {
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  // useCallback help stop component from re-rendering when either props/state
  // changes and it take a dependency array with the value/data that is being changed/update
  // usecallback checks to see if the data the function is updating change then re-write the
  // function again frm scratchif not do nothing
  const addToCart = useCallback(() => {
    setCart(cart + 1);
  }, [cart]);

  // useMemo is used to stop state causing the component from re-rendering
  // even when state is updated(i.e. the change occur but the component won't re-rendering)
  // which optimising the react component
  const mostExpensive = useMemo(
    () => calculateMostExpensive(products),
    [products]
  );
  return (
    <>
      <h1>Count : {count}</h1>
      <button className="btn" onClick={() => setCount(count + 1)}>
        click me
      </button>
      <h1 style={{ marginTop: "3rem" }}>cart : {cart}</h1>
      <h1>Most Expensive : ${mostExpensive}</h1>
      <BigList products={products} addToCart={addToCart} />
    </>
  );
};

// React.memo is used to stop state causing the component from re-rendering
// if for (e.g products is the main data here ) a state data doesn't change but (let say count which
//  is another state data changes the component of the web app won't change when the major data(products)
// didn't but minor count increase (count only chage and not products))
// NOTE: this react.memo looks to see if the props passed changes
const BigList = React.memo(({ products, addToCart }) => {
  // useEffect(() => {
  //   console.count('hello from big list');
  // });

  return (
    <section className="products">
      {products.map((product) => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        );
      })}
    </section>
  );
});

const SingleProduct = ({ fields, addToCart }) => {
  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;

  // useEffect(() => {
  //   console.count('hello from product');
  // });
  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>add to cart</button>
    </article>
  );
};
export default Index;
