import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authUser";

type errors = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const login = useAuthStore(
    (state: { login: (credentials: unknown) => Promise<void> }) => state.login
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
    navigate("/");
  };

  const loginHandler = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    action: string
  ) => {
    e.preventDefault();
    if (action === "autoFill") {
      setEmail("admin@example.com");
      setPassword("12345");
    }
  };

  const validate = (email: string, password: string) => {
    const errors: errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div className="w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md mb-20">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Login
          </h1>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white 
                    focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white 
                    focus:outline-none focus:ring"
                placeholder="••••••••"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md
                hover:bg-red-700"
              type="submit"
              disabled={Object.keys(validate(email, password)).length > 0}
            >
              Sign In
            </button>
          </form>
          <div className="text-center text-gray-400">
            Don't have an account?&nbsp;
            <Link to={"/signup"} className="text-red-500 hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-center text-gray-400">
            Don't remember your Password?&nbsp;
            <Link to={"/forgot-password"} className="text-red-500 hover:underline">
              Reset Here
            </Link>
          </div>
          <div className="text-center border border-r-2 border-gray-700 rounded-md bg-gray-600">
            <p className="text-white mb-2 py-2">
              Welcome to my Netflix clone project. For your convenience, you can
              use this button to log in
            </p>
            <p className="text-white">Email: admin@example.com</p>
            <p className="text-white mb-4">Password: 12345</p>
            <button
              type="button"
              onClick={(e) => loginHandler(e, "autoFill")}
              className="bg-red-600 w-60 py-2 text-white font-semibold rounded-md mb-4"
            >
              Auto Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
