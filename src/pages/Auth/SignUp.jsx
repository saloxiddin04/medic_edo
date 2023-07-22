import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";
import { register } from "../../auth/jwtService";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [isAgree, setIsAgree] = useState(false);

  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "",
  });

  const registerUser = (e) => {
    e.preventDefault();
    register(user)
      .then(() => {
        navigate("/sign-in");
        toast.success("Successfully registered");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-1/4">
        <div className="text-center">
          <h2 className="text-center text-4xl font-bold text-gray-700 dark:text-white">
            Register
          </h2>
        </div>

        <div className="mt-8">
          <form onSubmit={registerUser}>
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
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>

            <div className="my-4">
              <div className="flex justify-between">
                <label
                  htmlFor="name"
                  className="text-sm text-gray-600 dark:text-gray-200"
                >
                  Your name
                </label>
              </div>

              <input
                id="name"
                required
                type="text"
                name="name"
                placeholder="Name"
                className="form-input"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div>
              <div className="flex justify-between">
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

            <div className="flex items-center mt-3">
              <input
                id="default-checkbox"
                type="checkbox"
                className="w-4 h-4 rounded-md text-blue-600 bg-gray-100 border-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                value={isAgree}
                onChange={(e) => setIsAgree(e.target.checked)}
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm text-gray-400 dark:text-gray-200"
              >
                I accept the Terms and the Data Privacy Statement.
              </label>
            </div>

            <div className="mt-12">
              <button
                disabled={!isAgree}
                type="submit"
                className="btn-primary text-center w-full"
              >
                Register
              </button>

              <p className="mt-6 text-center text-sm text-gray-400">
                Are you already registered?
                <Link
                  className="ml-1 text-primary hover:underline"
                  to={ROUTES.SINGIN}
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
