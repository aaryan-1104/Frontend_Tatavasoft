import React from "react";
import { useContext } from "react";
import sonoContext from "../context/bookContext";

const CartProduct = (props) => {
  const {
    id,
    bookid,
    name,
    publisherid,
    base64image,
    price,
    categoryid,
    quantity,
  } = props.product;

  const context = useContext(sonoContext);
  const { removeFromCart, updateQuantity } = context;

  const handleRemoveFromCart = () => {
    removeFromCart(id);
    console.log("Removed from cart");
  };

  const handleQuantity = (bool) => {
    updateQuantity(bool, id, bookid, quantity);
  };
  return (
    <div className="border-2 mb-3">
      <div className="flex gap-4 m-3">
        <div className="bg-slate-600 w-150px h-150px">
          <img
            src={base64image}
            className="img-fluid rounded-start"
            style={{ width: "150px", height: "150px" }}
            alt="..."
          />
        </div>
        <div>
          <div className="">
            <span>{name}</span>
          </div>
          <div className="pt-3 text-redBook">
            <span>{publisherid}</span>
          </div>
          <div className="pt-3">
            Quantity
            <span
              className="px-1 cursor-pointer"
              onClick={() => {
                handleQuantity(false);
              }}
            >
              {" "}
              -
            </span>
            <span className="px-2"> {quantity} </span>
            <span
              className="px-1 cursor-pointer"
              onClick={() => {
                handleQuantity(true);
              }}
            >
              +
            </span>
          </div>
          <div className="pt-3">
            <h3 className="card-title">Sub Total</h3>
          </div>
        </div>
        <div className="flex-1">
          <div>
            <h3 className="text-right">&#8377; {(price * 80) / 100}</h3>
            <h3 className="pt-3 text-lg text-right">
              <span className="line-through text-slate-400">
                &#8377; {price}
              </span>
              <span className="font-bold text-redBook"> 20.00% Off</span>
            </h3>
            <h3
              className="pt-3 text-right text-redBook cursor-pointer"
              onClick={handleRemoveFromCart}
            >
              Remove
            </h3>
            <h3 className="pt-3 font-bold text-lg text-right">
              &#8377; {quantity * ((price * 80) / 100)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
