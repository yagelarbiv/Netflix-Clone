import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from '../store/authUser';
import SignUpNavbar from "../components/SignUpNavbar";

type errors = {
  email?: string;
  password?: string;
}

const SignUpPage = () => {
  const emailValue = localStorage.getItem("email")?.toString();
  localStorage.setItem("footer", JSON.stringify({
    theme: "white",
    text: "gray",
  }));

  console.log(localStorage.getItem("footer"))

  const [email, setEmail] = useState<string>(emailValue || "");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const signup = useAuthStore((state: { signup: (credentials: unknown) => Promise<void>; }) => state.signup);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("user",JSON.stringify({
      email, 
      password
    }));
    signup({ email, password });
    navigate("/chooseplan");
  };

  const validate = ({ email, password }: { email: string, password: string }) => {
    const errors: errors = {};
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
    <div className="flex flex-col items-center w-full bg-white text-black">

      <SignUpNavbar />

      <div className="flex flex-col items-center border-2 border-gray-300 rounded-lg w-full max-w-lg p-8 mb-5">

        <div className="mr-4">
          <h2 className="text-sm font-medium text-gray-500">STEP 1 OF 3</h2>
          <h1 className="text-4xl font-medium mt-2 text-left">
            Welcome back! <br /> Joining Netflix is easy.
          </h1>
          <p className="text-lg mt-4 text-left">
            Enter your password and you'll be watching in no time.
          </p>
        </div>

        <form className="w-full mt-8 space-y-4" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="email" className="text-lg block">
              Email
            </label>
            <input
              type="email"
              className="border-none bg-transparent text-black font-medium
                          focus:outline-none focus:ring"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              className="w-96 h-14 px-3 py-2 mt-1 border border-gray-300 rounded-sm text-black 
                          focus:outline-none focus:ring"
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Link
              to="/forgot-password"
              className="text-base text-blue-500 hover:underline mt-4">
              Forgot your password?
            </Link>
          </div>

          <button
            className="w-96 h-14 py-3 text-white bg-red-600 rounded-sm text-2xl hover:bg-red-700"
            disabled={Object.keys(validate({ email, password })).length > 0}
          >
            Next
          </button>

          <p className="text-sm text-center text-red-600 mt-2">
            {validate({ email, password }).password || ""}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
