import { useState } from "react";
import Footer from "../components/shared/footer";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { getError } from "../utils";
import { AxiosUsersInstance } from "../axios";
import useUserStore, { UserStore } from "../Store/UserStore";

function SignupPage() {
  const userStore: UserStore = useUserStore() as UserStore;
  const setUser: UserStore["setuser"] = userStore.setuser;
  const setToken: UserStore["setToken"] = userStore.setToken;
  const [emailAddress, setEmailAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const IsInvalid = password !== confirmPassword || emailAddress === "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await AxiosUsersInstance.post("/signup", {
        email: emailAddress,
        name: userName,
        password: password,
      });
      setUser({
        username: userName,
        email: data.email,
        password: 'password',
        isAdmin: false,
        profilePicture: "",
        myList: [],
      });
      setToken(data.token);
      navigate("/browse");
    } catch (error) {
      console.log(getError(error));
    }
  };

  return (
    <>
      <div className="header">
        <div className="OpacityLogin"></div>
        <nav className="nav">
          <img
            className="logo"
            src="src/assets/Netflix-Logo-large.svg"
            alt="netflix logo"
            onClick={() => navigate("/")}
          />
        </nav>
        <div className="Wrapper">
          <form className="Form" onSubmit={handleSubmit} method="POST">
            <h1 className="Title">Sign UP</h1>
            <input
              className="FormInput"
              type="text"
              placeholder="Enter UserName"
              onChange={({ target }) => setUserName(target.value)}
            />
            <input
              className="FormInput"
              type="text"
              placeholder="Email Address"
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              className="FormInput"
              type="password"
              placeholder="Password"
              autoComplete="off"
              onChange={({ target }) => setPassword(target.value)}
            />
            <input
              className="FormInput"
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
            <button className="Button" disabled={IsInvalid} type="submit">
              Sign In
            </button>
            <p>do you have an account? <Link to="/signin">Sign In Here</Link></p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignupPage;
