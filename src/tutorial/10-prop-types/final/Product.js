import React from "react";
import PropTypes from "prop-types";
import defaultImage from "../../../assets/default-image.jpeg";
const Product = ({ image, name, price }) => {
  // here we need check if the image in product requested has value
  // if no value in the image object then the && will return nothing
  // and the set a default image in the component if u need an img to show
  const url = image && image.url;

  return (
    <article className="product">
      {/* since we need a default img to show even when the imge from product doesn't
          have value
      */}
      <img src={url || defaultImage} alt={name || "default name"} />
      <h4>{name}</h4>
      <p>${price || 3.99}</p>{" "}
      {/* the price needs a default value when not available too */}
    </article>
  );
};

// we use the PropType to set the propert of our data/product
// i.e what is required from our data(APi calls)
// and to let the component know which data type to expect
// if the wrong data is gotten den react will complain
// normalize using proptype
Product.propTypes = {
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
// Product.defaultProps = {
//   name: 'default name',
//   price: 3.99,
//   image: defaultImage,
// };

export default Product;
