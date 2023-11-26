import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";
import {register, verify} from "../../auth/jwtService";
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {getItem, setItem} from "../../features/LocalStorageSlice/LocalStorageSlice";

const Verify = () => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch()
  const {email} = useSelector((state) => state.localStorage);
  
  const [otp, setOtp] = useState("")
  
  const registerUser = (e) => {
    e.preventDefault();
    const emailState = JSON.parse(email)
    verify({otp, email: emailState})
      .then(() => {
        navigate("/sign-in");
        toast.success("Successfully verified");
      })
      .catch((err) => {
        toast.error(err.response.data.error  || err.message);
      });
  };
  
  useEffect(() => {
    dispatch(getItem('email'))
  }, []);
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-1/4">
        <div className="text-center">
          <h2 className="text-center text-4xl font-bold text-gray-700 dark:text-white">
            Verify your email
          </h2>
        </div>
        
        <div className="mt-8">
          <form onSubmit={registerUser}>
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-600 dark:text-gray-200"
                >
                  Verification code
                </label>
              </div>
              
              <input
                id="password"
                required
                type="text"
                name="password"
                placeholder="Verification"
                className="form-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            
            
            <div className="mt-12">
              <button
                type="submit"
                className="btn-primary text-center w-full"
              >
                Verify
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

export default Verify;
