import React from "react";
import BookContext from "./bookContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookState = (props) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [alert, setAlert] = useState({ status: false });
  const [error, setError] = useState(false);

  //!Setting Up Alerts
  const showAlert = (type, message) => {
    setAlert({
      status: true,
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert({ status: false });
    }, 4000);
  };

  // Todo Get Count of items in Cart
  const setCartItemCount = (num) => {
    localStorage.setItem("cartCount", num);
    setCartCount(num);
  };

  //Todo Register/Create a new Account
  const userSignUp = async (fname, lname, email, roleid, password) => {
    setLoading(true);
    const url = `https://localhost:44337/user/register`;

    //* Api Call
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: fname,
        lastName: lname,
        email: email,
        password: password,
        roleid: roleid,
      }),
    });

    if (response.status !== 200) {
      showAlert("danger", "Internal error occured!! Please try again");
    } else {
      const json = await response.json();
      localStorage.setItem("token", json.id);
      localStorage.setItem("username", json.firstname);
      localStorage.setItem("roleid", json.roleid);

      getAllBooks(1);
      if (json.roleid === 3) {
        localStorage.setItem("consumerPageNumber", 1);
        navigate("/bookListing");
      } else {
        localStorage.setItem("sellerPageNumber", 1);
        navigate("/sellerBooksListing");
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 400);

    showAlert("success", "Registered Successfully");
  };

  //Todo Login
  const userLogin = async (email, password) => {
    setLoading(true);
    const url = `https://localhost:44337/user/login`;

    //*Api Call
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 200) {
      showAlert("danger", "Invalid Credential!! Please try again");
    } else {
      const json = await response.json();

      //* Store token after login which we will get in response from server
      localStorage.setItem("token", json.id);
      localStorage.setItem("username", json.firstname);
      localStorage.setItem("roleid", json.roleid);

      getAllBooks(1);
      //? If successfull login then forward user to users list if user is Admin or to seller product page if user is Seller or to product listing if user is Consumer
      if (localStorage.getItem("token") && json.roleid === 2) {
        localStorage.setItem("sellerPageNumber", 1);
        navigate("/sellerBooksListing");
      } else {
        localStorage.setItem("cartCount", json.cartCount);
        localStorage.setItem("consumerPageNumber", 1);
        navigate("/bookListing");
      }
      showAlert("success", "Logged In Successfully");
    }
    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  //Todo Get all the books for SellerBooksListings or BooksListing
  const getAllBooks = async (i, pageSize = 10) => {
    const url = `https://localhost:44337/books/getBooks?pageIndex=${
      i ? i : 1
    }&pageSize=${pageSize} `;

    setLoading(true);

    //* Api Call
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      showAlert("danger", "Internal error occured!! Please try again");
    } else {
      const json = await response.json();
      setTotalBooks(json.totalrecords);

      json.results.sort((a, b) => {
        return a.id - b.id;
      });

      setBooks(json.results);
      setCartCount(localStorage.getItem("cartCount"));
    }
    setLoading(false);
  };

  //Todo Get all the books for SellerBooksListings or BooksListing Filtered without authentication
  const getAllBooksFiltered = async (i, categoryid = 0, pageSize = 10) => {
    const url = `https://localhost:44337/books/getBooksByCategory?pageIndex=${i}&pageSize=${pageSize}&categoryid=${categoryid}`;

    setLoading(true);

    //* Api Call
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      showAlert("danger", "Internal error occured!! Please try again");
    } else {
      const json = await response.json();

      json.results.sort((a, b) => {
        return a.id - b.id;
      });

      setBooks(json.results);
      setTotalBooks(json.totalrecords);
      setCartCount(localStorage.getItem("cartCount"));
    }
    setLoading(false);
  };

  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  //Todo Get the cart
  const getCart = async () => {
    const url = `https://localhost:44337/cart/getCart/${Number(
      localStorage.getItem("token")
    )}?pageIndex=1&pageSize=100`;
    setLoading(true);

    //*Api call
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.status !== 200) {
      showAlert("danger", "Internal error occurred!! Please try again");
    } else {
      const json = await response.json();

      //* Changing state of cart
      setCart(json.results);

      localStorage.setItem("cartCount", json.totalrecords);
      setCartCount(localStorage.getItem("cartCount"));

      const newCart = json.results;
      let x = 0;
      for (let i = 0; i < newCart.length; i++) {
        x = x + newCart[i].quantity * newCart[i].price;
      }
      setCartValue(x);
    }

    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  //Todo Added to cart
  const addToCart = async (bookId) => {
    const url = "https://localhost:44337/cart/addToCart";
    setLoading(true);

    //*Api call
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userid: Number(localStorage.getItem("token")),
        bookid: bookId,
        quantity: 1,
      }),
    });

    //* Logic to add to CartList on client Side
    if (response.status === 409) {
      showAlert("danger", "Book already exists");
    } else if (response.status !== 200) {
      showAlert("danger", "Internal error occurred!! Please try again");
    } else {
      const json = await response.json();
      setCartItemCount(cartCount + 1);
      showAlert("success", "Added to cart!! Check your cart");
    }

    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  //TODO: Update quantity of a Product in Cart
  const updateQuantity = async (bool, cartBookId, bookId, quantity) => {
    const url = `https://localhost:44337/cart/updateCartItem`;
    setLoading(true);
    if (!bool && quantity - 1 === 0) {
      showAlert("danger", "Minimum quantity is one!!");
    }
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: cartBookId,
        userid: Number(localStorage.getItem("token")),
        bookid: bookId,
        quantity: quantity + (bool ? 1 : quantity === 1 ? 0 : -1),
      }),
    });

    if (response.status !== 200) {
      showAlert("danger", "Internal error occured!! Please try again");
    } else {
      const newCart = JSON.parse(JSON.stringify(cart));

      let x = cartValue;
      console.log(x);

      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].id === cartBookId) {
          if (bool === false && newCart[i].quantity !== 1) {
            x = x - newCart[i].price;
            showAlert("success", "Cart Item successfully updated");
          } else if (bool) {
            x = x + newCart[i].price;
            showAlert("success", "Cart Item successfully updated");
          }

          newCart[i].quantity =
            newCart[i].quantity +
            (bool ? 1 : newCart[i].quantity === 1 ? 0 : -1);
        }
      }
      setCartValue(x);
      setCart(newCart);
    }

    setLoading(false);
  };

  //todo: Remove From Cart
  const removeFromCart = async (bookCartId) => {
    //* Api Call
    const url = `https://localhost:44337/cart/deleteBook/${bookCartId}`;
    setLoading(true);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.status !== 200) {
      showAlert("danger", "Internal error occured!! Please try again");
    } else {
      const newCartlist = cart.filter((book) => {
        return book.id !== bookCartId;
      });
      setCart(newCartlist);

      let x = 0;
      for (let i = 0; i < newCartlist.length; i++) {
        x = x + newCartlist[i].quantity * newCartlist[i].price;
      }
      setCartValue(x);
      setCartItemCount(cartCount - 1);
    }
    showAlert("danger", "Cart Item successfully removed");
    setLoading(false);
  };

  //Todo: Sort the Books based on different parameters
  const sortBooks = async (sortType) => {
    let x = JSON.parse(JSON.stringify(books));
    if (sortType === 0) {
      x.sort((a, b) => {
        return a.id - b.id;
      });
    } else if (sortType === 1) {
      x.sort((a, b) => {
        let fa = a.name[0].toLowerCase(),
          fb = b.name[0].toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    } else if (sortType === 2) {
      x.sort((a, b) => {
        let fa = a.name[0].toLowerCase(),
          fb = b.name[0].toLowerCase();

        if (fa > fb) {
          return -1;
        }
        if (fa < fb) {
          return 1;
        }
        return 0;
      });
    }
    setBooks(x);
  };

  //Todo Search Books
  const [searchCount, setSearchCount] = useState(0);

  const searchBooks = async (q, i) => {
    const url = `https://localhost:44337/books/getBooks?pageIndex=${
      i ? i : 1
    }&pageSize=${12}&keyword=${q ? q : ""}`;

    setLoading(true);

    //* Api Call
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.status !== 200) {
      showAlert("danger", "Internal error occurred!! Please try again");
    } else {
      setBooks(json.results);
      setSearchCount(json.totalrecords);
    }
    setLoading(false);
  };

  return (
    <BookContext.Provider
      value={{
        loading,
        setLoading,
        alert,
        showAlert,
        books,

        sortBooks,

        userSignUp,
        userLogin,
        getAllBooks,
        getAllBooksFiltered,
        searchBooks,
        searchCount,

        cart,
        getCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartValue,

        totalBooks,
        error,
        setError,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
