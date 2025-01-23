import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";
import { useState } from "react";
import { toast } from "react-toastify";
import {forgotPasswordJwt} from "../../auth/jwtService";
import LOGO from "../../images/logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  
  const forgotPassword = (e) => {
    e.preventDefault();
    setLoading(true)
    forgotPasswordJwt({email})
      .then(() => {
        navigate("/verify");
        localStorage.setItem('email', JSON.stringify(email))
        localStorage.setItem('forgot', JSON.stringify(1))
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.error  || err.message);
      });
  };
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-3/4 lg:w-1/4 sm:w-2/4">
        <div className="text-center">
          <img src={LOGO} alt="logo" className={'w-[200px] h-[100px] object-cover m-auto'}/>
          <h2 className="text-center text-2xl font-bold text-gray-700 dark:text-white">
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
