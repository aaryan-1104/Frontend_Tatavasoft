import React from "react";
import { Link } from "react-router-dom";
import bookContext from "../context/bookContext";
import { useEffect, useContext, useState } from "react";
import Loader from "../Components/Loader";

const SellerBooksListing = () => {
  const context = useContext(bookContext);
  const { loading, books, getAllBooks, totalBooks, deleteBook } = context;
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getAllBooks(Number(localStorage.getItem("sellerPageNumber")));
  }, []);

  const handlePagination = (i = 0) => {
    const currPage = localStorage.getItem("sellerPageNumber");
    if (
      (Number(currPage) > 1 && i === -1) ||
      (Number(currPage) < Math.ceil(totalBooks / pageSize) && i === 1)
    ) {
      localStorage.setItem("sellerPageNumber", Number(currPage) + i);
      getAllBooks(Number(currPage) + i, pageSize);
    }
  };

  const handleSaveBook = (
    id,
    base64image,
    name,
    publisherid,
    categoryid,
    price
  ) => {
    const book = JSON.stringify({
      id: id,
      imageUrl: base64image,
      name: name,
      publisherid: publisherid,
      categoryid: categoryid,
      price: price,
    });
    localStorage.setItem("book", book);
  };

  const handleDeleteBook = (id) => {
    deleteBook(id);
  };

  const handlePageSize = () => {
    const currPage = localStorage.getItem("sellerPageNumber");

    setPageSize(Number(document.getElementById("pageSize").value));
    localStorage.setItem(
      "pageSize",
      Number(document.getElementById("pageSize").value)
    );
    getAllBooks(
      Number(currPage),
      Number(document.getElementById("pageSize").value)
    );
  };

  return (
    <div className="px-20">
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/*//Todo Main Heading of Seller Book Listing */}
          <div className="text-center pt-12 pb-5">
            <h1 className="text-4xl">Books Data</h1>
          </div>
          <div className="pb-20">
            <div className="flex flex-row-reverse pt-11 pb-8 gap-3 pr-24">
              <button className="px-4 py-2 h-10 bg-redBook text-white rounded border-2 border-slate-200 ">
                <Link to="/addBook">Add Product</Link>
              </button>
            </div>

            <div>
              <div className="flex items-center text-center h-16 justify-center">
                <div className="w-1/5">
                  <h2>Id</h2>
                </div>
                <div className="w-1/5">
                  <h2>Title</h2>
                </div>
                <div className="w-1/5">
                  <h2>Category</h2>
                </div>
                <div className="w-1/5">
                  <h2>Price</h2>
                </div>
                <div className="w-1/5 text-left">
                  <h2>Edit / Delete</h2>
                </div>
              </div>
              <hr />
              {books.map((book) => {
                return (
                  <>
                    <div
                      className="flex items-center text-center h-16 justify-center"
                      key={book.id}
                    >
                      <div className="w-1/5">
                        <h2>{book.id} </h2>
                      </div>
                      <div className="w-1/5">
                        <h2> {`${book.name.slice(0, 20)}`} </h2>
                      </div>
                      <div className="w-1/5">
                        <h2> {book.categoryid} </h2>
                      </div>
                      <div className="w-1/5">
                        <h2> {book.price} </h2>
                      </div>
                      <div className="w-1/5 flex">
                        <button
                          className="mr-2 px-4 pt-1 pb-2 h-9 w-20 text-greenBook rounded border-2 border-greenBook"
                          onClick={() => {
                            handleSaveBook(
                              book.id,
                              book.base64image,
                              book.name,
                              book.publisherid,
                              book.categoryid,
                              book.price
                            );
                          }}
                        >
                          <Link to={`/editBook`}>Edit</Link>
                        </button>
                        <button
                          className="px-4 pt-1 pb-2 h-9 text-redBook rounded border-2 border-redBook"
                          onClick={() => {
                            handleDeleteBook(book._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            </div>

            {/* //! Rows per page function is not completed, working on default 25 */}
            <div className="h-16 items-center flex  flex-row-reverse gap-4 pt-7 mr-24">
              <button
                className="px-3 py-2"
                onClick={() => {
                  handlePagination(1);
                }}
              >{`>`}</button>
              <span>{`Page ${localStorage.getItem(
                "sellerPageNumber"
              )} of ${Math.ceil(
                totalBooks / Number(localStorage.getItem("pageSize"))
              )}`}</span>
              <button
                className="px-3 py-2"
                onClick={() => {
                  handlePagination(-1);
                }}
              >{`<`}</button>
              <select
                id="pageSize"
                className="rounded p-2 bg-white border-0"
                onChange={handlePageSize}
                value={pageSize}
              >
                <option className="bg-white" value="10">
                  10
                </option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
              <span>Rows per Page</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerBooksListing;
