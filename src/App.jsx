import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// Routes
import AppRoutes from "./Routes/Routes.jsx";
import { ROUTES } from "./Routes/constants.js";

// components
import Navbar from "./common/Navbar";
import Sidebar from "./common/Sidebar";

import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import { getUserData } from "./auth/jwtService.js";

// toast
import { ToastContainer } from "react-toastify";

// pages
import PastTest from "./pages/PassTest/PastTest";
import Results from "./pages/PassTest/Results.jsx";
import Explanation from "./pages/Explanations/Explanation.jsx";
import LoadingPage from "./pages/LoadingPage.jsx";
import TestReview from "./pages/TestReview/TestReview";
import Verify from "./pages/Auth/Verify";
import Forgot from "./pages/Auth/Forgot";
import NewPassword from "./pages/Auth/NewPassword";
import NotGroupModal from "./components/NotGroup";

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
    if (pathname === "/") {
      navigate(ROUTES.MAIN);
    }
  }, [navigate, pathname]);

  const checkRoute = () => {
    if (
      pathname === "/sign-up" ||
      pathname === "/sign-in" ||
      pathname === "/verify" ||
      pathname === "/test" ||
      pathname === "/test-results" ||
      pathname === "/test-review" ||
      pathname === "/forgot" ||
      pathname === "/new-password" ||
      pathname.includes("explanation")
    ) {
      return false;
    } else {
      return true;
    }
  };
  
  useEffect(() => {
    if (!getUserData() &&
      pathname !== "/sign-up" &&
      pathname !== "/sign-in" &&
      pathname !== "/new-password" &&
      pathname !== "/verify" &&
      pathname !== "/forgot"
    ) {
      navigate(ROUTES.SINGIN);
    }
  }, [navigate, pathname]);

  if (isLoading) return <LoadingPage />;
  
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
          <Route path={ROUTES.EXPLANATION} element={<Explanation />} />
          <Route path={ROUTES.TEST_REVIEW} element={<TestReview />} />
          <Route path={ROUTES.VERIFY} element={<Verify />} />
          <Route path={ROUTES.FORGOT} element={<Forgot />} />
          <Route path={ROUTES.NEW_PASSWORD} element={<NewPassword />} />
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
