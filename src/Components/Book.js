import React from "react";
import { useContext } from "react";

import bookContext from "../context/bookContext";

const Book = (props) => {
  const { book } = props;
  const context = useContext(bookContext);
  const { addToCart } = context;

  const handleCart = (id) => {
    addToCart(id);
    console.log("Add To Cart");
  };

  return (
    <div className="mb-6 px-4" style={{ width: "18rem" }} key={book.id}>
      <div className="bg-black">
        <img
          src={book.base64image}
          className=""
          style={{ height: "40vh" }}
          alt="..."
        />
      </div>
      <div className="">
        <h5 className="text-2xl mb-0 font-bold">{book.name}</h5>
        <div className="pt-3 text-lg">
          <span>MRP </span>
          <span className="line-through">{book.price}</span>
          <span className="font-bold text-greenBook"> 20.00% Off</span>
        </div>
        <span className="font-bold text-redBook">
          &#8377; {`${(book.price * 80) / 100}`}
        </span>
        <h5 className="pt-3 pb-3">Publisher : {book.publisherid}</h5>
        <button
          className={`rounded p-2 bg-redBook text-white w-full`}
          onClick={() => {
            handleCart(book.id);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Book;
