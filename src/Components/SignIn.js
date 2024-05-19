import React, { useContext, useState } from "react";
import stockMarket from "../Images/stockMarket.jpg";
import MonitorHeart from "@mui/icons-material/MonitorHeart";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserIdContext from "../Context/UserIdContext";

const host = "http://localhost:5555";

const SignIn = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { userId, setUserId } = useContext(UserIdContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    try {
      const response = await axios.post(`${host}/api/signin`, { email, password });
      const json = response.data;

      console.log(json);
      setUserId(json.user.id);
      console.log(`Welcome Back!`);
      navigate("/dashboard");

    } catch (error) {
      console.error("Error during sign-in:", error);
      console.log("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="w-full h-screen flex flex-row">
        <section className="w-1/2 bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <MonitorHeart sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                STOCK MONITOR
              </Typography>
            </p>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                      value={credentials.email}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={credentials.password}
                      onChange={onChange}
                      minLength={8}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link to="/signUp" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className="flex h-screen w-1/2">
          <img src={stockMarket} alt="" className="object-cover" />
        </div>
      </div>
    </>
  );
};

export default SignIn;
