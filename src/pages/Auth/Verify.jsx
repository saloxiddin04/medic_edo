import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../../Routes/constants";
import {forgotPasswordJwt, register, verify} from "../../auth/jwtService";
import {useState} from "react";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {getItem, setItem} from "../../features/LocalStorageSlice/LocalStorageSlice";

const Verify = () => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch()
  
  const [otp, setOtp] = useState("")
  
  const [loading, setLoading] = useState(false)
  
  const [time, setTime] = useState(180); // 3 minutes in seconds
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  
  const registerUser = (e) => {
    e.preventDefault();
    const emailStorage = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : ''
    const forgotStorage = localStorage.getItem('forgot') ? JSON.parse(localStorage.getItem('forgot')) : ''
    verify({otp, email: emailStorage})
      .then(() => {
        if (forgotStorage === 1) {
          navigate("/new-password");
          toast.success("Successfully verified");
        } else {
          navigate("/sign-in");
          toast.success("Successfully verified");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      });
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      // Update seconds and minutes
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 59));
      setMinutes((prevMinutes) => (seconds === 0 ? prevMinutes - 1 : prevMinutes));
      
      // Update total time
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      
      if (time === 0) {
        setTime(0)
        setMinutes(0)
        setSeconds(0)
        clearInterval(timer);
      }
    }, 1000);
    
    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [seconds]);
  
  
  useEffect(() => {
    dispatch(getItem('email'))
    dispatch(getItem('forgot'))
  }, [dispatch]);
  
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
              
              <div className={'flex justify-end mt-2'}>
                {time === 0 ? (
                  <h1
                    className={'cursor-pointer'}
                    onClick={() => {
                      const emailState = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : ''
                      setLoading(true)
                      forgotPasswordJwt({email: emailState}).then((r) => {
                        setTime(180)
                        setMinutes(3)
                        setSeconds(0)
                        setLoading(false)
                        toast.success('successfully resend');
                        setTimeout(() => {
                          window.location.reload()
                        }, 2000)
                      }).catch((err) => {
                        toast.error(err.response.data.error || err.message);
                        setTimeout(() => {
                          window.location.reload()
                        }, 2000)
                      });
                    }}
                  >
                    {!loading ? 'Resend' : 'Loading...'}
                  </h1>
                ) : (
                  <h1>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h1>
                )}
              </div>
            </div>
            
            
            <div className="mt-12">
              <button
                type="submit"
                className="btn-primary text-center w-full"
              >
                {!loading ? 'Verify' : 'Loading...'}
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
