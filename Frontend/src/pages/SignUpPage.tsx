import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from '../store/authUser';

type errors = {
  email?: string;
  username?: string;
  password?: string;
}

const SignUpPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState<string>(emailValue || "");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const signup = useAuthStore((state: { signup: (credentials: unknown) => Promise<void>; }) => state.signup);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, username, password);
    signup({ email, username, password });
    navigate("/");
  };

  const validate = ({ email, username, password }: { email: string, username: string, password: string }) => {
    const errors: errors = {};
  if (!username) {
    errors.username = "Username is required";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  }
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 5) {
    errors.password = "Password must be at least 5 characters";
  }
  return errors;
  };

  return (
    <div className=" w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>

          <form className="space-y-4" onSubmit={handleSignUp}>
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
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white 
                            focus:outline-none focus:ring"
                placeholder="johndoe"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              disabled={Object.keys(validate({ email, username, password })).length > 0}
            >
              Sign Up
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?&nbsp;
            <Link to={"/login"} className="text-red-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
