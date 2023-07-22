import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// Routes
import AppRoutes from "./Routes/Routes.jsx";
import { ROUTES } from "./Routes/constants.js";

// components
import Navbar from "./common/Navbar";
import Sidebar from "./common/Sidebar";

import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

// toast
import { ToastContainer } from "react-toastify";
import PastTest from "./pages/PassTest/PastTest";
import { getUserData } from "./auth/jwtService.js";
import Results from "./pages/PassTest/Results.jsx";

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") {
      navigate(ROUTES.MAIN);
    }
  }, [navigate, pathname]);

  const checkRoute = () => {
    if (
      pathname === "/sign-up" ||
      pathname === "/sign-in" ||
      pathname === "/test" ||
      pathname === "/test-results"
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (!getUserData() && pathname !== "/sign-up") {
      navigate(ROUTES.SINGIN);
    }
  }, [navigate, pathname]);

  return (
    <div>
      {checkRoute() ? (
        <>
          <Navbar />
          <Sidebar />
          <div className="ml-56 p-8 pt-24 min-h-screen bg-[#f5f5f5]">
            <AppRoutes />
          </div>
        </>
      ) : (
        <Routes>
          <Route path={ROUTES.SINGIN} element={<SignIn />} />
          <Route path={ROUTES.SINGUP} element={<SignUp />} />
          <Route path={ROUTES.TEST} element={<PastTest />} />
          <Route path={ROUTES.RESULTS} element={<Results />} />
        </Routes>
      )}

      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        theme="colored"
        position="bottom-left"
      />
    </div>
  );
};

export default App;
