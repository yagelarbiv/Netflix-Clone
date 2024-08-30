import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faChevronDown } from '@fortawesome/free-solid-svg-icons';

// Define the first footer component
const FooterDefault = () => {
  const FooterItems = [
    "FAQ", "Help Center", "Account", "Media Center", "Investor Relations", 
    'Jobs', "Ways to Watch", "Terms of Use", "Privacy", "Cookie Preferences", 
    "Corporate Information", "Contact Us", "Speed Test", "Legal Guarantee",
  ];

  return (
    <footer className={`flex flex-col w-full min-h-80 md:px-8 md:py-0 bg-black text-white border-gray-800`}>
      <div className="h-screen items-center mt-10 justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-center">
          Built by{" "}
          <a
            href="https://github.com/yagelarbiv"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Yagel & Avi
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/yagelarbiv"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-center">
          This product uses the TMDB API but is not endorsed or certified by &nbsp;
          <img
            className="inline-block h-10 w-10"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="TMDB logo"
          />
        </p>
        <div>
          <div>
            <p className="underline mb-5 text-sm">Questions? Contact us.</p>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {FooterItems.map((item, index) => (
              <li key={index}>
                <a href="#" className="underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};


const FooterSpecial = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-7">
      <div className="max-w-screen-lg ml-20 px-4 grid gap-6 text-gray-500">
        <p>
          <a className="text-gray-600 text-xs hover:underline" href="">
            Questions? Contact us.
          </a>
        </p>
        <div className="flex flex-col text-xs md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <ul className="space-y-2">
            <li><a className="text-gray-600 hover:underline" href="">FAQ</a></li>
            <li><a className="text-gray-600 hover:underline" href="">Cookie Preferences</a></li>
          </ul>
          <ul className="space-y-2">
            <li><a className="text-gray-600 hover:underline" href="">Help Center</a></li>
            <li><a className="text-gray-600 hover:underline" href="">Corporate Information</a></li>
          </ul>
          <ul className="space-y-2">
            <li><a className="text-gray-600 hover:underline" href="">Terms of Use</a></li>
            <li><a className="text-gray-600 hover:underline" href="">Privacy</a></li>
          </ul>
        </div>
        <div className="relative flex items-center">
          <select className="appearance-none cursor-pointer h-12 pl-8 pr-10 text-gray-500 bg-transparent border border-gray-300 rounded" onChange={(e) => window.location.href = e.target.value}>
            <option value="english" selected>English</option>
            <option value="">עברית</option>
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
            <FontAwesomeIcon icon={faGlobe} className="text-lg" />
            <FontAwesomeIcon icon={faChevronDown} className="text-lg ml-16" />
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Footer component that renders one of the above based on the URL
const Footer = () => {
  const location = useLocation();

  // Define the special URLs where the second footer should be displayed
  const specialUrls = ["/registration", "/signup" ,"/chooseplan", "/plan", "/paymentpicker", "/creditoption", "/paypaloption"]; 

  // Determine which footer to render based on the current path
  const isSpecialPage = specialUrls.includes(location.pathname);

  return isSpecialPage ? <FooterSpecial /> : <FooterDefault />;
};

export default Footer;
