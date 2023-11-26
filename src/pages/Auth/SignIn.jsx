import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";
import { login } from "../../auth/jwtService";
import { useState } from "react";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const loginUser = (e) => {
    e.preventDefault();
    login(user)
      .then(() => {
        navigate("/main");
        setTimeout(() => {
          toast.success("You have successfully logged in");
        }, 200);
      })
      .catch((err) => {
        toast.error(err.response.data.detail || err.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-1/4">
        <div className="text-center">
          <h2 className="text-center text-4xl font-bold text-gray-700 dark:text-white">
            Login
          </h2>
        </div>

        <div className="mt-8">
          <form onSubmit={loginUser}>
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="username"
                  className="text-sm text-gray-600 dark:text-gray-200"
                >
                  Your username
                </label>
              </div>

              <input
                id="username"
                required
                type="text"
                name="username"
                placeholder="Username"
                className="form-input"
                value={user.username}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div>
              <div className="flex justify-between mt-4">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-600 dark:text-gray-200"
                >
                  Your Password
                </label>
              </div>

              <input
                id="password"
                required
                type="password"
                name="password"
                placeholder="Your Password"
                className="form-input"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="mt-12">
              <button type="submit" className="btn-primary text-center w-full">
                Login
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            You are not registered yet?
            <Link
              className="ml-1 text-primary hover:underline"
              to={ROUTES.SINGUP}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
