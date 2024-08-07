import './footer.css';
/*---> Component <---*/
const Footer = () => {
  return (
    <footer className="footer">
      <a className="TitleFooter">Questions? Contact us.</a>
      <div className="Row">
        <div className="Column">
          <a className="Link">FAQ</a>
          <a className="Link">Investor Relations</a>
          <a className="Link">Privacy</a>
          <a className="Link">Speed Test</a>
        </div>
        <div className="Column">
          <a className="Link">Help Center</a>
          <a className="Link">Jobs</a>
          <a className="Link">Cookie Preferences</a>
          <a className="Link">Legal Notices</a>
        </div>
        <div className="Column">
          <a className="Link">Account</a>
          <a className="Link">Ways to Watch</a>
          <a className="Link">Corporate Information</a>
          <a className="Link">NetShow Originals</a>
        </div>
        <div className="Column">
          <a className="Link">Media Center</a>
          <a className="Link">Terms of Use</a>
          <a className="Link">Contact Us</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
