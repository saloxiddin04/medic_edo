import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes/constants";

const NotFound = () => {
  return (
    <div className="flex flex-col mt-32 items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-8">Oops!</h1>
      <h1 className="text-center text-6xl font-bold text-primary mb-8">404</h1>
      <p className="text-2xl font-medium text-gray-600 mb-8">
        Looks like you're lost...
      </p>
      <Link to={ROUTES.MAIN} className="btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
