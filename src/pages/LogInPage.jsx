import React, { useState, useEffect, useContext } from "react";
import Header from "../components/LogIn/Header";
import LoginForm from "../components/LogIn/LogInForm";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider, useAuth } from "../AuthContext";
import { BabysitterContext } from "../context/BabysitterContext";
import CircularProgress from "@mui/material/CircularProgress"; // Ensure CircularProgress is imported once

const LoginPage = () => {
  const { state, dispatch } = useContext(BabysitterContext);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loading, setLoading] = useState(false); // Initialize loading state
  const navigate = useNavigate();
  const login = useAuth().login;

  useEffect(() => {
    if (showSignUp) {
      navigate("/signup");
    }
  }, [showSignUp, navigate]);

  const handleLoginSubmit = async ({ email, password }) => {
    setLoading(true); // Set loading to true when login starts
    try {
      const result = await login({ email, password });
      if (result.user) {
        dispatch({
          type: "SET_USER",
          payload: result.user.userData,
        });
        navigate("/");
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: result.error.message,
        });
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    } finally {
      setLoading(false); // Set loading to false when login is complete
    }
  };

  const handleSignup = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <AuthProvider>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Header />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {showSignUp ? "Sign up for an account" : "Sign in to your account"}
              </h1>
              {loading ? (
                <CircularProgress /> // Show loading indicator when loading
              ) : (
                <LoginForm
                  onSubmit={handleLoginSubmit}
                  onSignUp={handleSignup}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </AuthProvider>
  );
};

export default LoginPage;
