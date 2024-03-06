import React, { useState, useEffect, useContext } from "react";
import Header from "../components/LogIn/Header";
import LoginForm from "../components/LogIn/LogInForm";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider, useAuth } from "../AuthContext";
import { BabysitterContext } from "../context/BabysitterContext";
import { CircularProgress } from "@mui/material";

const LoginPage = () => {
  const { state, dispatch } = useContext(BabysitterContext);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuth().login;

  useEffect(() => {
    // כאשר showSignUp משתנה, בדוק אם הוא true ואז נווט
    if (showSignUp) {
      navigate("/signup");
    }
  }, [showSignUp, navigate]); // הוסף את navigate כתלות אם אתה משתמש בגרסאות חדשות של react-router-dom שדורשות זאת

  const handleLoginSubmit = async ({ email, password }) => {
    console.log(`Logging in with email: ${email} and password: ${password}`);
    try {
      const result = await login({ email, password });
      console.log(
        "Login successful should navigate to home page, result:",
        result,
      );
      if (result.user) {
        console.log("-------");
        dispatch({
          type: "SET_USER",
          payload: result.user.userData,
        });
        console.log(result);
        // user = result.data.user;
        // session = result.data.session;
        navigate("/");
      } else {
        console.error("Login failed", {
          message: result.error.message,
          name: result.error.name,
          status: result.error.status,
          stack: result.error.stack,
        });

        // lets set form field with the error
        // lets set form field with the error
        dispatch({
          type: "SET_ERROR",
          payload: result.error.message,
        });
      }
    } catch (error) {
      console.error("Login failed", error);
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = () => {
    setShowSignUp(!showSignUp);
    if (showSignUp) {
      navigate("/signup");
    }
  };

  return (
    <AuthProvider>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Header />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {showSignUp
                  ? "Sign up for an account"
                  : "Sign in to your account"}
              </h1>
              {loading && <CircularProgress></CircularProgress>}{" "}
              {/* Display a loading message or spinner */}
              {
                <LoginForm
                  onSubmit={handleLoginSubmit}
                  onSignUp={handleSignup}
                  loading={loading}
                />
              }
            </div>
          </div>
        </div>
      </section>
    </AuthProvider>
  );
};

export default LoginPage;
