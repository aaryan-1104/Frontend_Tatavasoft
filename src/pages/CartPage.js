import React from "react";
import { useEffect, useContext } from "react";
import sonoContext from "../context/bookContext";
import CartProduct from "../Components/CartProduct";
import Loader from "../Components/Loader";
import { Link, useLocation } from "react-router-dom";

const CartPage = () => {
  const context = useContext(sonoContext);
  const { loading, cart, getCart, cartValue, placeOrder } = context;
  const location = useLocation();

  useEffect(() => {
    getCart();
    // eslint-disable-next-line
  }, [location]);

  const handlePlaceOrder = () => {
    placeOrder();
  };

  return (
    <div className="xl:px-80 lg:px-40 md:px-20 px-10">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1
            className="py-5"
            style={{ fontSize: "2vw", fontWeight: "bolder" }}
          >
            Your Shopping Cart
          </h1>
          {cart.length > 0 ? (
            <div className="row">
              <div className="px-0 me-5">
                {/* //*Cart Item List */}
                <div className="m-0">
                  <div className="px-0">
                    {/* //*Grand Total of cart item*/}
                    {cartValue !== 0 && (
                      <div
                        className=" bg-white p-4 mb-3"
                        style={{ maxHeight: "450px" }}
                      >
                        <h3 className="mb-4 text-xl font-bold">Cart Summary</h3>
                        <div>
                          <span className="text-base font-bold">Total MRP</span>{" "}
                          <span className="text-base font-bold" style={{ float: "right" }}>
                          &#8377; {cartValue}
                          </span>
                        </div>
                        <div>
                          <span className="text-base text-greenBook font-bold">Discount on MRP</span>{" "}
                          <span className="text-base font-bold text-greenBook" style={{ float: "right" }}>
                            20%
                          </span>
                        </div>

                        <div>
                          <span className="text-base ">Total Savings</span>{" "}
                          <span className="text-base " style={{ float: "right" }}>
                          &#8377; {cartValue*20/100}
                          </span>
                        </div>
                        <div>
                          <span className="text-base font-bold text-redBook">Total Amount</span>{" "}
                          <span className="text-base font-bold text-redBook" style={{ float: "right" }}>
                          &#8377; {Math.ceil(cartValue*80/100)}
                          </span>
                        </div>
                        <div>
                          <div className="text-center mt-5 d-grid">
                            <button
                              className="rounded p-2 w-full bg-redBook text-white"
                              onClick={handlePlaceOrder}
                            >
                              Place your order
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {cart.map((book) => {
                      return (
                        <div className="mb-3" key={book.id}>
                          <CartProduct product={book} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="m-0 text-center my-5">
              <h2 style={{ color: "darkslategrey" }}>Your cart is empty</h2>
              <h3 style={{ color: "darkslategrey" }}>
                Add some products to preceed ahead
              </h3>
              <Link
                className={`nav-link ${
                  location === "/bookListing" ? "active" : ""
                }`}
                to="/bookListing"
                style={{ color: "#009473" }}
              >
                Buy some products from Store
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
