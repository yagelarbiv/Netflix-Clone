import React, { useState } from "react";
import SignForm from "../components/SignForm/SingForm";
import Footer from "../components/shared/footer";
import "./LogIn.css";
import { getError } from "../utils";
import { useNavigate } from "react-router-dom";
import { AxiosUsersInstance } from "../axios";
import useUserStore, { UserStore } from "../Store/UserStore";

/*---> Component <---*/
const SigninPage = () => {
  const userStore: UserStore = useUserStore() as UserStore;
  const setUser: UserStore["setuser"] = userStore.setuser;
  const setToken: UserStore["setToken"] = userStore.setToken;
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const IsInvalid = password === "" || emailAddress === "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await AxiosUsersInstance.post("/login", {
        email: emailAddress,
        password: password,
      });
      setUser({
        email: data.email,
        password: "password",
        username: data.username,
        isAdmin: data.isAdmin,
        profilePicture: data.profilePicture,
        myList: data.myList,
      });
      setToken(data.token);
      navigate("/browse");
    } catch (error) {
      setError(getError(error));
      console.log(getError(error));
    }
  };

  const loginHandler = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    action: string
  ) => {
    e.preventDefault();
    try {
      if (action === "autoFill") {
        setPassword("admin@example.com");
        setEmailAddress("12345");
      } else {
        console.log("Wrong Action");
      }
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
        <SignForm
          error={error}
          password={password}
          emailAddress={emailAddress}
          IsInvalid={IsInvalid}
          setEmailAddress={setEmailAddress}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          loginHandler={loginHandler}
        />
      </div>
      <Footer />
    </>
  );
};

export default SigninPage;
