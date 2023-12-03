import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";
import {changePassword, login} from "../../auth/jwtService";
import { useState } from "react";
import { toast } from "react-toastify";
import {useSelector} from "react-redux";
import LOGO from "../../images/logo.png";

const NewPassword = () => {
  const navigate = useNavigate();
  
  const {email} = useSelector((state) => state.localStorage);
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const loginUser = (e) => {
    e.preventDefault();
    const emailStorage = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : ''
    changePassword({email: emailStorage, password})
      .then(() => {
        navigate("/sign-in");
        setTimeout(() => {
          toast.success("You have successfully change password");
          localStorage.removeItem('email')
          localStorage.removeItem('forgot')
        }, 200);
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      });
  };
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-1/4">
        <div className="text-center">
          <img src={LOGO} alt="logo" className={'w-[200px] h-[100px] object-cover m-auto'}/>
          <h2 className="text-center text-2xl font-bold text-gray-700 dark:text-white">
            New Password
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
                  New password
                </label>
              </div>
              
              <input
                id="username"
                required
                type="password"
                name="username"
                placeholder="New password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between mt-4">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-600 dark:text-gray-200"
                >
                  Confirm Password
                </label>
              </div>
              
              <input
                id="password"
                required
                type="password"
                name="password"
                placeholder="Confirm Password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <button disabled={password !== confirmPassword || password === '' || confirmPassword === ''} type="submit" className="btn-primary text-center w-full">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
