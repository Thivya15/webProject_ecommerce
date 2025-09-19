import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
      <div className="bg-gray-800 p-12 rounded-3xl shadow-xl w-96 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">ElecroHub</h1>
        <p className="text-xl font-semibold text-white mb-6">Ecommerce-Electronics</p>
        <p className="text-gray-400 mb-8">Login to continue</p>
        <button
          onClick={() => loginWithRedirect()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl text-lg transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
