import React, { useState, useEffect } from "react";
import Header from "../components/LogIn/Header";
import UserForm from "../components/SignUp/userForm";
import { createSupabaseClient } from "../lib/supabaseClient";
import { addUser, addBabysitter, addParent, addChildren } from "../api";
import { useNavigate } from "react-router-dom";
import Moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    // Simulate an async operation like fetching data or waiting for something to load
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the operation is complete
    }, 2000); // Adjust the timeout duration as needed

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ minHeight: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <section
      className="bg-gray-50 dark:bg-gray-900"
      style={{ minHeight: "100vh", paddingTop: "90px" }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Header />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up for your account
            </h1>
            <UserForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
