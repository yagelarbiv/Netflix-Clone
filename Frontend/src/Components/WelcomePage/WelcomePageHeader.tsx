import './WelcomePageHeader.css';

export default function WelcomePageHeader({navigate, children}: {navigate: (path: string) => void, children: React.ReactNode}) {
  function handleClick () {
    navigate("/signin");
  }
  return (
    <div className="WelcomePageHeader">
      <div className='Opacity'></div>
      <nav className="navHeader">
        <img className='logo' src="./src/assets/Netflix-Logo-large.svg" alt="Netflix-Logo" />
        <div>
          <select name="Language" title='Language' className="Language">
            <option value="English">English</option>
            <option value="hebrew">עברית</option>
          </select>
          <button type='button' className="buttonSignIn" onClick={handleClick}>Sign In</button>
        </div>
      </nav>
      <div className="Feature">
        <h1 className='HeaderTitle'>Unlimited movies, TV shows, and more.</h1>
        <h2 className='Warning'>This is NOT official NetFlix</h2>
      </div>
      {children}
    </div>
  );
}