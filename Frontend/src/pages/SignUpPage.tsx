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
 

  const [email, setEmail] = useState<string>(emailValue || "");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>(""); // Track password error state
  const navigate = useNavigate();

  const signup = useAuthStore((state: { signup: (credentials: unknown) => Promise<void>; }) => state.signup);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationErrors = validate({ email, password });
    
    if (validationErrors.password) {
      setPasswordError(validationErrors.password); // Set error message if validation fails
    } else {
      setPasswordError(""); // Clear error message if no validation errors
      localStorage.setItem("user", JSON.stringify({ email, password }));
      signup({ email, password });
      navigate("/chooseplan");
    }
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
      errors.password = "Password must be at least 5 characters"; // Check for password length
    }
    return errors;
  };

  return (
    <div className="flex flex-col items-center w-full bg-white text-black">

      <SignUpNavbar />

      <div className="flex flex-col items-center rounded-lg w-full max-w-lg p-8 mt-14">

        <div className="mr-4">
          <h2 className="text-sm font-medium text-gray-500">STEP 1 OF 3</h2>
          <h1 className="text-4xl font-medium mt-1 text-left">
            Welcome back! <br /> Joining Netflix is easy.
          </h1>
          <p className="text-lg mt-4 text-left">
            Enter your password and you'll be watching in no time.
          </p>
        </div>

        <form className="w-full mt-3 space-y-4" onSubmit={handleSignUp}>
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
            {passwordError && (
              <p className="text-red-600 text-sm mb-1">{passwordError}</p>
            )}
            <input
              type="password"
              className={`w-96 h-14 px-3 py-2 mt-1 border rounded-sm text-black 
                          focus:outline-none focus:ring ${passwordError ? "border-red-600" : "border-gray-300"}`}
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(""); // Clear error when user starts typing
              }}
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
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
