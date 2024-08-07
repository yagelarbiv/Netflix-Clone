import React, { useState } from "react";
import SignForm from "../components/SignForm/SingForm";
import Footer from "../components/shared/footer";
import "./LogIn.css";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { useNavigate } from "react-router-dom";

/*---> Component <---*/
const SigninPage = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const IsInvalid = password === "" || emailAddress === "";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //Axios push to backend and mongo
    if (IsInvalid) {
      setError("Please fill out all fields");
      return;
    }
  };


  const loginHandler = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => {
    e.preventDefault();
    try {
        let emailValue:string = "";
        let passwordValue: string = "";

        if (action === "autoFill") {
            emailValue = "admin@example.com";
            passwordValue = "12345";
        } else {
          toast.error("Wrong Action");
        }

        //Axios push to backend and mongo
        setEmailAddress(emailValue);
        setPassword(passwordValue);
        
    } catch (error) {
        toast.error(getError(error));
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
            onClick={() => navigate('/')}
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
