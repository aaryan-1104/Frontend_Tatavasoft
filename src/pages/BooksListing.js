import React from "react";
import bookContext from "../context/bookContext";
import { useEffect, useContext } from "react";
import Loader from "../Components/Loader";
import Book from "../Components/Book";

const BooksListing = () => {
  const context = useContext(bookContext);
  const {
    loading,
    books,
    sortBooks,
    getAllBooks,
    getAllBooksFiltered,
    totalBooks,
    addToCart,
  } = context;

  useEffect(() => {
    if (document.getElementById("category").value === "0") {
      getAllBooks(Number(localStorage.getItem("consumerPageNumber")));
    } else {
      getAllBooksFiltered(
        Number(localStorage.getItem("consumerPageNumber")),
        Number(document.getElementById("category").value)
      );
    }
  }, []);

  const onChange = () => {
    if (document.getElementById("category").value === "0") {
      getAllBooks(Number(localStorage.getItem("consumerPageNumber")));
    } else {
      getAllBooksFiltered(
        Number(localStorage.getItem("consumerPageNumber")),
        Number(document.getElementById("category").value)
      );
    }
  };

  const onChangeSort = () => {
    let x = document.getElementById("sort");
    if (x.value === "0") {
      sortBooks(0);
    } else if (x.value === "1") {
      sortBooks(1);
    } else if (x.value === "2") {
      sortBooks(2);
    }
  };

  const handlePagination = (i) => {
    const currPage = localStorage.getItem("consumerPageNumber");
    if (document.getElementById("category").value === "0") {
      if (
        (Number(currPage) > 1 && i === -1) ||
        (Number(currPage) < Math.ceil(totalBooks / 10) && i === 1)
      ) {
        localStorage.setItem("consumerPageNumber", Number(currPage) + i);
        getAllBooks(Number(currPage) + i);
      }
    } else {
      if (
        (Number(currPage) > 1 && i === -1) ||
        (Number(currPage) < Math.ceil(totalBooks / 10) && i === 1)
      ) {
        localStorage.setItem("consumerPageNumber", Number(currPage) + i);
        getAllBooksFiltered(
          Number(currPage) + i,
          Number(document.getElementById("category").value)
        );
      }
    }
  };

  const handleCart = (id) => {
    addToCart(id);
    console.log("Add To Cart");
  };

  return (
    <div className="px-20">
      <h1 className="pt-12 pb-6 text-4xl text-center">Product Listing</h1>
      <div className="pb-10">
        {/* //Todo Product string and Sort By */}
        <div className="grid grid-cols-6 pt-12 pb-11 md:px-40 pc-20">
          <span className="pl-0 text-xl col-start-1 col-end-3">{`Total Results -  ${totalBooks} items`}</span>
          <div
            className="col-start-4 col-end-5 inline-block relative w-64"
            style={{ float: "right" }}
          >
            <select
              id="sort"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={onChangeSort}
            >
              Choose a category
              <option value="0">Custom</option>
              <option value="1">A-Z</option>
              <option value="2">Z-A</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* //Todo Product string and Sort By */}
          <div
            className="col-start-6 col-end-7 inline-block relative w-64"
            style={{ float: "right" }}
          >
            <select
              id="category"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={onChange}
            >
              Choose a category
              <option value="0">All Categories</option>
              <option value="5">General Knowledge</option>
              <option value="7">Science & Technology</option>
              <option value="8">History</option>
              <option value="12">Fiction</option>
              <option value="24">Horror</option>
              <option value="26">Biography</option>
              <option value="39">Entertainment</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* //Todo Card */}
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
              {books.map((book) => {
                return <Book book={book} key={book.id} />;
              })}
            </div>
          </div>
        )}
      </div>

      {!loading && (
        <div className="pb-20 text-center">
          <span
            className="pr-2 cursor-pointer"
            onClick={() => {
              handlePagination(-1);
            }}
          >{`<`}</span>
          <span
            className="px-2 p-0 bg-redBook text-white"
            style={{ borderRadius: "48%" }}
          >{`Page ${localStorage.getItem("consumerPageNumber")} of ${Math.ceil(
            totalBooks / 10
          )}`}</span>
          <span
            className="pl-2 cursor-pointer"
            onClick={() => {
              handlePagination(1);
            }}
          >{`>`}</span>
        </div>
      )}
    </div>
  );
};

export default BooksListing;
