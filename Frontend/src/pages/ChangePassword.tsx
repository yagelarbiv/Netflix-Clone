import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom"
import useAuthStore, { User } from "../store/authUser";


function ChangePassword() {
  const { GeneratedCode } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { user, update } = useAuthStore() as { user: User, update: (user: User) => Promise<void> };
  console.log(GeneratedCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      toast.success("Password changed successfully");
      update({
        ...user,
        password: password,
      });
      navigate("/login");
    }
  };
  
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(code === "1234") {
      setChangePassword(true);
    }
  }

  return (
    <div className="w-full contain forgot-Password">
    <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
      <Link to={"/"}>
        <img src="../public/netflix-logo.png" alt="logo" className="w-52" />
      </Link>
    </header>

    <div className="flex justify-center items-center mt-20 mx-3">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Enter Code and Change password
        </h2>
        {
          !changePassword ? (
            <form className="space-y-4" onSubmit={handleCodeSubmit}>
              <label htmlFor="email">
                Enter Code: 
              </label>
              <input
                type="text"
                placeholder="enter the Code sent you"
                className="w-full p-3 border border-gray-300 rounded-r-lg"
                name="email"
                onChange={(e) => setCode(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                >
                  check Code
                </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password">
                  Enter Password:
                </label>
                <input
                  type="password"
                  placeholder="enter your password"
                      className="w-full p-3 border border-gray-300 rounded-r-lg"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password">
                    Enter Confirm Password:
                  </label>
                  <input
                  type="password"
                  placeholder="confirm your password"
                      className="w-full p-3 border border-gray-300 rounded-r-lg"
                  name="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                >
                  Change Password
                </button>
            </form>
          )
        }
      </div>
    </div>
  </div>
  )
}

export default ChangePassword
