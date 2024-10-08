import { Link } from "react-router-dom";
import SignUpNavbar from "../components/SignUpNavbar";
import { useNavigate } from "react-router-dom";
import useAuthStore from '../store/authUser';
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreditOptionPage = () => {
  const signup = useAuthStore((state: { signup: (credentials: unknown) => Promise<void>; }) => state.signup);
  const user = localStorage.getItem("user")?.toString();
  const { email, password } = JSON.parse(user || "{}");
  const navigate = useNavigate();

  const [planName, setPlanName] = useState<string>('');
  const [planPrice, setPlanPrice] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<Date | null>(null); // Use Date type for DatePicker
  const [cvv, setCvv] = useState<string>('');
  const [nameOnCard, setNameOnCard] = useState<string>('');
  const [agree, setAgree] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const savedPlanName = sessionStorage.getItem('selectedPlanName');
    const savedPlanPrice = sessionStorage.getItem('selectedPlanPrice');
    if (savedPlanName && savedPlanPrice) {
      setPlanName(savedPlanName);
      setPlanPrice(savedPlanPrice);
    }
  }, []);

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const cleanedValue = value.replace(/\D/g, '');
    
    // Group the digits in sets of 4
    const formattedValue = cleanedValue.match(/.{1,4}/g)?.join(' ') || '';
    
    return formattedValue;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!cardNumber || !expirationDate || !cvv || !nameOnCard || !agree) {
      setErrorMessage("Please fill in all fields and agree to the terms.");
      return;
    }

    const username = email.split("@")[0];
    signup({ email, username, password });
    navigate("/");
  };

  return (
    <>
      <SignUpNavbar />

      <div className="max-w-md mx-auto p-6 bg-white rounded-md mt-4">
        <h2 className="text-sm font-semibold mb-1">STEP 3 OF 3</h2>
        <h1 className="text-3xl font-bold mb-6">Set up your credit or debit card</h1>

        <div className="flex items-center mb-6">
          <img src="../public/visa.png" alt="Visa" className="h-8 mr-2" />
          <img src="../public/mastercard.png" alt="MasterCard" className="h-8 mr-2" />
          <img src="../public/amex.png" alt="Amex" className="h-8" />
        </div>

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Card number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={19}
            />
          </div>

          <div className="flex justify-between mb-4">
            <DatePicker
              selected={expirationDate}
              onChange={(date: Date | null) => setExpirationDate(date)}
              dateFormat="MM/yy"
              showMonthYearPicker
              className="mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Expiration date"
            />
            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-1/2 ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={3}
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Name on card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={20}
            />
          </div>

          <div className="p-4 bg-gray-100 rounded-md mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium">{planPrice}/month</span>
              <Link to='/plan'>
                <button className="text-blue-500 font-medium">Change</button>
              </Link>
            </div>
            <span className="text-sm text-gray-500">{planName}</span>
          </div>

          <div className="text-xs text-gray-500 mb-4">
            By checking the checkbox below, you agree to our
            <Link to="" className="text-blue-500 hover:underline"> Terms of Use</Link>,
            <Link to="" className="text-blue-500 hover:underline"> Privacy Statement</Link>, and that you are over 18. Netflix will automatically
            continue your membership and charge the membership fee ({planPrice}/month) to your payment method until you cancel.
            You may cancel at any time to avoid future charges.
          </div>

          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="agree" 
              className="mr-2 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500" 
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="agree" className="text-sm text-gray-700">I agree.</label>
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm mb-4">
              {errorMessage}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full h-16 bg-red-600 text-white text-2xl font-medium py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Start Membership
          </button>

          <div className="text-xs text-gray-500 mt-4">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
            <Link to="" className="text-blue-500 hover:underline"> Learn more</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreditOptionPage;




