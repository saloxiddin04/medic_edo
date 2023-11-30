import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux";
import {setItem} from "../../features/LocalStorageSlice/LocalStorageSlice";
import {forgotPasswordJwt} from "../../auth/jwtService";
import LoadingPage from "../LoadingPage";

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch()
  
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  
  const forgotPassword = (e) => {
    e.preventDefault();
    setLoading(true)
    forgotPasswordJwt({email})
      .then(() => {
        navigate("/verify");
        dispatch(setItem({key: 'email', value: JSON.stringify(email)}))
        dispatch(setItem({key: 'forgot', value: JSON.stringify(1)}))
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.error  || err.message);
      });
  };
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-1/4">
        <div className="text-center">
          <h2 className="text-center text-4xl font-bold text-gray-700 dark:text-white">
            Send your email
          </h2>
        </div>
        
        <div className="mt-8">
          <form onSubmit={forgotPassword}>
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-600 dark:text-gray-200"
                >
                  Email
                </label>
              </div>
              
              <input
                id="password"
                required
                type="email"
                name="password"
                placeholder="Email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            
            <div className="mt-12">
              <button
                disabled={loading}
                type="submit"
                className="btn-primary text-center w-full flex justify-center"
              >
                {!loading ? 'Send' : <div className="loading-spinner"></div>}
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

export default ForgotPassword;
