import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SiteLogo from "../resources/images/SiteLogo.svg";
import bookContext from "../context/bookContext";
import cart from "../resources/images/images/cart.png";

import flipStyle from "../../src/css/flipStyle.module.css";

const Navbar = () => {
  const context = useContext(bookContext);
  const { cartCount, searchBooks } = context;
  const navigate = useNavigate();

  const params = useParams();
  const { keyword } = params;
  const [query, setQuery] = useState(keyword);

  const onClick = () => {
    searchBooks(query, 1);
  };

  const onChange = () => {
    const q = document.getElementById("search").value;
    setQuery(q);

    if (!q) {
      navigate(`./bookListing/searchBooks/${1}`);
    } else {
      searchBooks(query, 1);
      navigate(`/bookListing/searchBooks/${1}/${q}`);
    }
  };

  const handleYourOrder = () => {
    // getOrders();
    console.log("Hello Admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div>
      <div className="">
        <div className="flex items-center h-92px">
          {/*//Todo Logo */}
          <div className="ps-5">
            <Link to="/">
              <div
                style={{
                  backgroundImage: `url(${SiteLogo})`,
                  backgroundSize: "100%",
                  height: "50px",
                  width: "185px",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </Link>
          </div>

          {/*//Todo Login , Register and Cart button on right */}
          {!localStorage.getItem("token") ? (
            <ul className="flex ml-auto pr-5">
              <li className="text-2xl text-redBook ps-5 cursor-pointer">
                <Link to="/login">Login</Link>
              </li>
              <li className="text-2xl text-slate-300 px-1">|</li>
              <li className="text-2xl text-redBook pr-5">
                <Link to="/signup">Register</Link>
              </li>
            </ul>
          ) : (
            <ul className="flex ml-auto pr-5">
              {localStorage.getItem("roleid") === "3" && (
                <li>
                  <Link to="/cartPage">
                    <button
                      className="px-4 py-2 text-slate-300"
                      data-micron="pop"
                    >
                      <img src={cart} alt="" />
                      <span className="text-redBook">
                        Cart
                        {/* {cartCount} */}
                      </span>
                    </button>
                  </Link>
                </li>
              )}
              {localStorage.getItem("roleid") === "1" && (
                <li>
                  {/* <button className="px-4 py-2 text-slate-300"> */}
                  <Link to="/userListing" onClick={handleYourOrder}>
                    <span className="px-2 text-redBook"> Users</span>
                  </Link>
                  <span style={{ color: "rgb(241,77,84,0.4)" }}> | </span>
                  <Link to="/categoryListing" onClick={handleYourOrder}>
                    <span className="px-2 text-redBook"> Categories</span>
                  </Link>
                  <span style={{ color: "rgb(241,77,84,0.4)" }}>|</span>
                  <Link to="/bookListing" onClick={handleYourOrder}>
                    <span className="px-2 text-redBook">Books</span>
                  </Link>
                  <span style={{ color: "rgb(241,77,84,0.4)" }}>|</span>
                  <Link to="/updateProfile" onClick={handleYourOrder}>
                    <span className="px-2 pr-8 text-redBook">
                      {" "}
                      Update Profile
                    </span>
                  </Link>
                  {/* </button> */}
                </li>
              )}
              <li>
                <button className="px-4 py-2 text-slate-300 rounded border-2 border-redBook">
                  <Link to="/login" onClick={handleLogout}>
                    <span className="text-redBook"> Logout </span>
                  </Link>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      {/*//Todo Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-1 h-20 justify-center items-center space-x-2 bg-slate-100">
        <div></div>
        <div className="md:col-span-2 md:col-start-3 md:col-end-5">
          <input
            id="search"
            className=" px-3 text-slate-400 bg-white border-slate-400 h-10 w-422px mb-1 outline-none"
            type="text"
            onChange={onChange}
            placeholder="What are you looking for..."
          />
        </div>
        <button
          className={`${flipStyle.fliphorizontalbottom} md:col-start-5 md:col-end-6 px-4 py-2 text-white rounded bg-redBook`}
          onClick={onClick}
          data-micron="pop"
          // data-micron-duration=".95"
        >
          {/* {localStorage.getItem("roleid") === "2" ? (
            <Link to={`/bookListing/sellerSearchBooks/${1}/${query}`}>
              Search
            </Link>
          ) : localStorage.getItem("roleid") === "1" ? (
            <Link to={`/userListing/adminSearchUsers/${1}/${query}`}>
              Search
            </Link>
          ) : ( */}
          <Link to={`/bookListing/searchBooks/${1}/${query}`}>Search</Link>
          {/* )} */}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
