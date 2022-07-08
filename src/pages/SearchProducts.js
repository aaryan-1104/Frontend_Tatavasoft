import React from "react";
import bookContext from "../context/bookContext";
import { useEffect, useContext } from "react";
import Loader from "../Components/Loader";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Book from "../Components/Book";

const SearchProducts = () => {
  const context = useContext(bookContext);
  const { loading, books, searchBooks, searchCount } = context;

  const { q, pageIndex } = useParams();

  const location = useLocation();

  useEffect(() => {
    searchBooks(q, pageIndex);
  }, [location]);

  const handlePagination = (i) => {
    if (
      (Number(pageIndex) > 1 && i === -1) ||
      (Number(pageIndex) < Math.ceil(searchCount / 12) && i === 1)
    ) {
      searchBooks(q, Number(pageIndex) + i);
    }
  };

  return (
    <div className="px-20">
      <h1 className="pt-12 pb-6 text-4xl text-center">
        Search results for : {q}
      </h1>
      <div className="pb-10">
        {/* //Todo Product string and Sort By */}
        <div className="flex flex-wrap justify-between pt-12 pb-11 px-20">
          <span className=" text-xl">{`Product Name -  ${searchCount} items`}</span>
        </div>

        {/* //Todo Card */}
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="grid md:grid-cols-4 grid-cols-1 gap-8 pl-24">
              {books.map((book) => {
                return <Book book={book} key={book.id} />;
              })}
            </div>
          </div>
        )}
      </div>

      {/* //! Pagination is not working */}
      {!loading && (
        <div className="pb-20 text-center">
          {pageIndex < 2 ? (
            <span className="pr-2 btn">{`<`}</span>
          ) : (
            <span
              className="pr-2 btn"
              onClick={() => {
                handlePagination(-1);
              }}
            >
              <Link
                to={`/bookListing/searchBooks/${Number(pageIndex) - 1}/${
                  q ? q : ""
                }`}
              >
                {`<`}
              </Link>
            </span>
          )}
          <span
            className="px-2 btn p-0 bg-redBook text-white"
            style={{ borderRadius: "48%" }}
          >{`Page ${pageIndex} of ${Math.ceil(searchCount / 12)}`}</span>
          {pageIndex >= Math.ceil(searchCount / 12) ? (
            <span className="pr-2 btn">{`>`}</span>
          ) : (
            <span
              className="pr-2 btn"
              onClick={() => {
                handlePagination(1);
              }}
            >
              <Link
                to={`/bookListing/searchBooks/${Number(pageIndex) + 1}/${
                  q ? q : ""
                }`}
              >
                {`>`}
              </Link>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
