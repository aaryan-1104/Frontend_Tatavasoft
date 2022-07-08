import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bookContext from "../context/bookContext";
import { useContext } from "react";
import Loader from "../Components/Loader";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const SignUp = () => {
  const location = useLocation();
  const context = useContext(bookContext);
  const { loading, userSignUp, setLoading } = context;

  //* State variable which will store credentials entered by user
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    roleid: 0,
    password: "",
    cpassword: "",
  };

  const onSubmit = (values) => {
    userSignUp(
      values.fname,
      values.lname,
      values.email,
      values.roleid,
      values.password
    );
  };

  const validationSchema = Yup.object({
    fname: Yup.string().required("Required!"),
    lname: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email format!").required("Required!"),
    password: Yup.string()
      .min(7, "Minimum length should be 7")
      .required("Required!"),
    cpassword: Yup.string()
      .required("Required!")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    if (
      localStorage.getItem("token") &&
      Number(localStorage.getItem("roleid")) === 2
    ) {
      navigate("/sellerBookListing");
    } else if (
      localStorage.getItem("token") &&
      Number(localStorage.getItem("roleid")) === 3
    ) {
      navigate("/bookListing");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <div>
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
                    to="/signup"
                    className={`${
                      location.pathname === "/signup" ? "font-bold" : ""
                    }`}
                  >
                    Create an Account
                  </Link>
                </li>
              </ol>
            </div>
          </div>
          <div>
            {/*//Todo Main Heading of Login */}
            <div className="text-center pb-6">
              <h1 className="text-4xl">Login or Create an Account</h1>
            </div>

            {/* //Todo Grid for Create account and Login */}
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <div className="grid justify-center grid-cols-1 pt-12">
                  {/* //Todo New Customer Instruction */}
                  <div className="px-10 mx-20 ">
                    {" "}
                    {/* //? To be changed */}
                    <h1 className="text-xl pb-5">Personal Information</h1>
                    <hr />
                    <h3 className="py-5 text-slate-400">
                      Please enter the following information to create your
                      account
                    </h3>
                    {/* //Todo Create an Account Section */}
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5 ">
                      <div className="form-control">
                        <h3 className="pb-3.5 pt-10" htmlFor="fname">
                          First Name
                        </h3>
                        <Field
                          type="text"
                          id="fname"
                          name="fname"
                          className=" px-3 bg-slate-100 border-slate-400 h-10 w-full"
                        />
                        <ErrorMessage
                          className="error text-red-500"
                          name="fname"
                          render={(msg) => (
                            <div className="text-red-600">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="form-control">
                        <h3 className="pb-3.5 pt-10" htmlFor="lname">
                          Last Name
                        </h3>
                        <Field
                          type="text"
                          id="lname"
                          name="lname"
                          className=" px-3 bg-slate-100 border-slate-400 h-10 w-full"
                        />
                        <ErrorMessage
                          className="error"
                          name="lname"
                          render={(msg) => (
                            <div className="text-red-600">{msg}</div>
                          )}
                        />
                      </div>
                    </div>
                    {/* //Todo Email */}
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5 ">
                      <div className="form-control">
                        <h3 className="pb-3.5 pt-10" htmlFor="email">
                          Email
                        </h3>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className=" px-3 bg-slate-100 border-slate-400 h-10 w-full"
                        />
                        <ErrorMessage
                          className="error"
                          name="email"
                          render={(msg) => (
                            <div className="text-red-600">{msg}</div>
                          )}
                        />
                      </div>
                      <div>
                        <h3 className="pb-3.5 pt-10">Role</h3>
                        <Field
                          as="select"
                          name="roleid"
                          id="select"
                          className=" px-3 bg-slate-100 border-slate-400 h-10 w-full"
                          placeholder="Choose a Role"
                        >
                          <option>Select your Role</option>
                          <option value="2">Seller</option>
                          <option value="3">Buyer</option>
                        </Field>
                        <ErrorMessage
                          className="error"
                          name="roleid"
                          render={(msg) => (
                            <div className="text-red-600">{msg}</div>
                          )}
                        />
                      </div>
                    </div>
                    <h1 className="text-xl pt-20">Login Information</h1>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                      <div className="form-control">
                        <h3 className="pb-3.5 pt-10" htmlFor="password">
                          Password
                        </h3>
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          className=" px-3 bg-slate-100 border-slate-400 h-10 w-full"
                        />
                        <ErrorMessage
                          className="error"
                          name="password"
                          render={(msg) => (
                            <div className="text-red-600">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="form-control">
                        <h3 className="pb-3.5 pt-10" htmlFor="cpassword">
                          Confirm Password
                        </h3>
                        <Field
                          type="password"
                          id="cpassword"
                          name="cpassword"
                          className=" px-3 bg-slate-100 border-slate-400 h-10 w-full"
                        />
                        <ErrorMessage
                          className="error text-red-600"
                          name="cpassword"
                          render={(msg) => (
                            <div className="text-red-600">{msg}</div>
                          )}
                        />
                      </div>
                    </div>
                    <div className="pt-14 pb-20">
                      <button
                        type="submit"
                        className="h-10 w-24 bg-redBook text-white rounded border-2 border-slate-200"
                      >
                        Register
                      </button>
                    </div>
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

export default SignUp;
