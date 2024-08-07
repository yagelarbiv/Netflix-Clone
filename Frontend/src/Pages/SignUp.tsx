import "./SignUp.css";
import { Button, Form } from "react-bootstrap";

function SignUp() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const setuser = useUserStore((state: any) => state.setuser);
  // const navigate = useNavigate();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const target = event.target as typeof event.target & {
  //     email: { value: string };
  //   };
  //   const email = target.email.value;
  //   setuser({ email });
  // };
  // const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const target = e.target as typeof e.target & {
  //     language: { value: string };
  //   };
  //   const language = target.language.value;
  //   if (language === "English") {
  //     localStorage.setItem("language", "English");
  //   }
  //   if (language === "עברית") {
  //     localStorage.setItem("language", "עברית");
  //   }
  // };

  return (
    <div className="sign-up">
      <div className="opacity"></div>
      <header>
        <div className="sign-up-header">
          <img
            className="logo"
            src="src\assets\Netflix-Logo-large.svg"
            alt="Netflix logo"
          />
          <div className="sign-up-links">
            <select title="Language" id="language">
              <option value="English">English</option>
              <option value="עברית">עברית</option>
            </select>
            <a href="Log-in">
              <Button className="sign-up-Button" variant="danger">Sign In</Button>
            </a>
          </div>
        </div>
      </header>
      <div className="sign-up-body">
        <h1 className="sign-up-title">Unlimited movies, TV shows, and more</h1>
        <p className="sign-up-text">Watch anywhere. Cancel anytime.</p>
        <Form>
          <h3 className="sign-up-subtitle">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>
          <div className="sign-up-form">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className="sign-up-Input"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Button className="sign-up-Button" variant="danger" type="submit">
              Get Started
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
