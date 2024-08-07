
import './optForm.css'

const FormOption = () => {

  return (
    <>
      <p className="option">
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <div className="form">
        <input type="email" placeholder="Email Address" className="input" />
        <button type="submit" className="button">
          Get Started
        </button>
      </div>
    </>
  )
}

export default FormOption;
