import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import illustration from "images/login-illustration.svg";
import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useAuth } from "context/AuthProvider";
import Swal from "sweetalert2";

const LoginPage = () => {
  const { login, form, setForm } = useAuth();

  const logoLinkUrl = "#";
  const illustrationImageSrc = illustration;
  const headingText = "Sign In To Treact";
  const socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign In With Google",
      url: "https://google.com",
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign In With Twitter",
      url: "https://twitter.com",
    },
  ];
  const submitButtonText = "Sign In";
  const forgotPasswordUrl = "#";
  const signupUrl = "#";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the login function from useAuth
    await login();
   
  };

  return (
    <AnimationRevealPage>
      <div className="min-h-screen bg-violet-700 text-white font-medium flex justify-center -m-8">
        <div className="max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <a href={logoLinkUrl}>
              <img src={logo} className="h-12 mx-auto" alt="Logo" />
            </a>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                {headingText}
              </h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  {socialButtons.map((socialButton, index) => (
                    <a
                      key={index}
                      href={socialButton.url}
                      className="w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hover:bg-gray-200 hover:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0"
                    >
                      <span className="iconContainer">
                        <img
                          src={socialButton.iconImageSrc}
                          className="icon"
                          alt=""
                        />
                      </span>
                      <span className="text">{socialButton.text}</span>
                    </a>
                  ))}
                </div>
                <div className="my-12 border-b text-center relative">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent">
                    Or Sign in with your e-mail
                  </div>
                </div>
                <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0"
                  />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  />
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <LoginIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </button>
                </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  <a
                    href={forgotPasswordUrl}
                    className="border-b border-gray-500 border-dotted"
                  >
                    Forgot Password ?
                  </a>
                </p>
                <p className="mt-8  text-sm text-gray-600 text-center">
                  Dont have an account?{" "}
                  <a
                    href={signupUrl}
                    className="border-b text-black border-dotted"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center">
            <div
              className={`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
              style={{ backgroundImage: `url("${illustrationImageSrc}")` }}
            ></div>
          </div>
        </div>
      </div>
    </AnimationRevealPage>
  );
};

export default LoginPage;
