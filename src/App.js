import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import BookState from "./context/BookState";
import Alert from "./Components/Alert";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BooksListing from "./pages/BooksListing";
import SellerBooksListing from "./pages/SellerBooksListing";
import CartPage from "./pages/CartPage";
import SearchProducts from "./pages/SearchProducts";

function App() {
  // if(localStorage.getItem('token'))

  return (
    <>
      <Router>
        <BookState>
          <div className="App">
            <Alert />
            <Navbar />
            <Routes>
              <Route exact path="/" element={<BooksListing />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<SignUp />}></Route>
              <Route
                exact
                path="/sellerBooksListing"
                element={<SellerBooksListing />}
              ></Route>
              <Route
                exact
                path="/bookListing"
                element={<BooksListing />}
              ></Route>
              <Route exact path="/cartPage" element={<CartPage />}></Route>
              <Route
                exact
                path="/bookListing/searchBooks/:pageIndex/:q"
                element={<SearchProducts />}
              ></Route>
              <Route
                exact
                path="/bookListing/searchBooks/:pageIndex"
                element={<SearchProducts />}
              ></Route>
            </Routes>
          </div>
        </BookState>
      </Router>
    </>
  );
}

export default App;
