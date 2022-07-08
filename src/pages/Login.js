import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bookContext from "../context/bookContext";
import { useContext } from "react";
import Loader from "../Components/Loader";

import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const Login = () => {
  const location = useLocation();
  const context = useContext(bookContext);
  const { loading, userLogin, setLoading } = context;

  //* State variable which will store credentials entered by user
  const initialValues = {
    email: "",
    password: "",
  };

  //* Function which will be fired when Login Button Clicked
  const onSubmit = (values) => {
    userLogin(values.email, values.password);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format!").required("Required!"),
    password: Yup.string()
      .min(7, "Minimum length should be 7")
      .required("Required!"),
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (
      localStorage.getItem("token") &&
      Number(localStorage.getItem("roleid")) === 2
    ) {
      navigate("/sellerBooksListing");
    } else if (
      localStorage.getItem("token") &&
      Number(localStorage.getItem("roleid")) === 3
    ) {
      navigate("/bookListing");
    }
    setLoading(false);
  });

  return (
    <div className="px-20">
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/*//Todo Pagination  */}
          <div className="container flex justify-center mx-auto py-12">
            <div className="w-full rounded">
              <ol className="flex justify-center text-redBook">
                <li>
                  <Link
                    to="/"
                    className={`${
                      location.pathname === "/" ? "font-bold" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <Link
                    to="/login"
                    className={`${
                      location.pathname === "/login" ? "font-bold" : ""
                    }`}
                  >
                    Login
                  </Link>
                </li>
              </ol>
            </div>
          </div>

          {/*//Todo Main Heading of Login */}
          <div className="text-center pb-6">
            <h1 className="text-4xl">Login or create an Account</h1>
          </div>

          {/* //Todo Grid for Create account and Login */}
          <div className="grid md:grid-cols-2 grid-cols-1 pt-12">
            {/* //Todo New Customer Instruction */}
            <div>
              <h1 className="text-xl pb-5">New Customer</h1>
              <hr />
              <h3 className="py-5 text-slate-400">
                Registration is free and easy
              </h3>
              <ul className="list-disc  list-inside">
                <li className="pb-3">Faster Checkout</li>
                <li className="pb-3">Save multiple shipping addresses</li>
                <li className="pb-3">View and track orders and more</li>
              </ul>
              <div className="pt-36 pb-20">
                <Link to={"/signup"}>
                  <button className="px-4 py-2 h-10 w-56 bg-redBook text-slate-300 rounded border-2 border-slate-200">
                    Create an Account
                  </button>
                </Link>
              </div>
            </div>

            {/* //Todo Registered Customer's Login Section */}
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <div className="pr-10">
                  <h1 className="text-xl pb-5">Registered Customers</h1>
                  <hr />
                  <h3 className="py-5 text-slate-400">
                    If you have account with us, please log in.
                  </h3>

                  <div className="form-control">
                    <h3 className="pb-3.5 pt-10" htmlFor="email">
                      Email
                    </h3>
                    <Field
                      className=" px-3 bg-slate-100 border-slate-400 h-10 w-422px"
                      type="email"
                      id="email"
                      name="email"
                    />
                    <ErrorMessage
                      className="error"
                      name="email"
                      render={(msg) => (
                        <div className="text-red-600">{msg}</div>
                      )}
                    />
                  </div>

                  <div className="form-control">
                    <h3 className="pb-3.5 pt-10" htmlFor="password">
                      Password
                    </h3>
                    <Field
                      className=" px-3 bg-slate-100 border-slate-400 h-10 w-422px"
                      type="password"
                      id="password"
                      name="password"
                    />
                    <ErrorMessage
                      className="error text-red-600"
                      name="password"
                      render={(msg) => (
                        <div className="text-red-600">{msg}</div>
                      )}
                    />
                  </div>

                  <div className="pt-14 pb-20">
                    <button
                      type="submit"
                      className="px-4 py-2 h-10 w-24 bg-redBook text-white rounded border-2 border-slate-200"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
