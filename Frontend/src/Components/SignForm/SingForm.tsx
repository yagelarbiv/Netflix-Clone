import { FormEvent } from "react";
import "./SignForm.css";
import { Link } from "react-router-dom";

type SetterFunction = (value: string) => void;
type HandleSubmitFunction = (event: FormEvent<HTMLFormElement>) => void;
type HandleSignupClickFunction = (
  e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  action: string
) => void;
interface SignFormProps {
  error: string;
  password: string;
  emailAddress: string;
  IsInvalid: boolean;
  setEmailAddress: SetterFunction;
  setPassword: SetterFunction;
  loginHandler: HandleSignupClickFunction;
  handleSubmit: HandleSubmitFunction;
}

const SignForm = ({
  error,
  password,
  emailAddress,
  IsInvalid,
  setEmailAddress,
  setPassword,
  handleSubmit,
  loginHandler,
}: SignFormProps) => {
  return (
    <div className="Wrapper">
      <form className="Form" onSubmit={handleSubmit} method="POST">
        <h1 className="Title">Sign in</h1>
        {error ? <div className="ErrorWrapper">{error}</div> : null}
        <input
          className="FormInput"
          type="text"
          placeholder="Email Address"
          value={emailAddress}
          onChange={({ target }) => setEmailAddress(target.value)}
        />
        <input
          className="FormInput"
          type="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button className="Button" disabled={IsInvalid} type="submit">
          Sign In
        </button>
        <p>do you have an account? <Link to="/signup">Sign Up Here</Link></p>
        <div className="AdminSignIn">
          <p className="AdminMessage">
            Welcome to my Netflix clone project. For your convenience, you can
            use this button to log in
          </p>
          <p className="AdminEmail">Email: admin@example.com</p>
          <p className="AdminPassword">Password: 12345</p>
          <button
            type="button"
            onClick={(e) => loginHandler(e, "autoFill")}
            className="Button"
          >
            Auto Connect
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignForm;
