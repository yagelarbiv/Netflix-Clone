import { useState } from "react";
import { Link } from "react-router-dom";

const countryCodes = [
  {
    name: "United States",
    code: "+1",
  },
  {
    name: "Canada",
    code: "+1",
  },
  {
    name: "Russia",
    code: "+7",
  },
  {
    name: "China",
    code: "+86",
  },
  {
    name: "United Kingdom",
    code: "+44",
  },
  {
    name: "Germany",
    code: "+49",
  },
  {
    name: "France",
    code: "+33",
  },
  {
    name: "India",
    code: "+91",
  },
  {
    name: "Japan",
    code: "+81",
  },
  {
    name: "Australia",
    code: "+61",
  },
  {
    name: "Brazil",
    code: "+55",
  },
  {
    name: "South Africa",
    code: "+27",
  },
  {
    name: "Mexico",
    code: "+52",
  },
  {
    name: "Italy",
    code: "+39",
  },
  {
    name: "Spain",
    code: "+34",
  },
  {
    name: "Turkey",
    code: "+90",
  },
  {
    name: "South Korea",
    code: "+82",
  },
  {
    name: "Argentina",
    code: "+54",
  },
  {
    name: "Nigeria",
    code: "+234",
  },
  {
    name: "Saudi Arabia",
    code: "+966",
  },
];

function ForgotPassword() {
  const [resetOption, setResetOption] = useState<string>("email");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+421");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here

  };

  return (
    <div className="w-full contain hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Update password, email or phone
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                How would you like to reset your password?
              </label>
              <div className="flex items-center mb-2">
                <input
                  id="email-option"
                  type="radio"
                  value="email"
                  checked={resetOption === "email"}
                  onChange={() => setResetOption("email")}
                  className="form-radio text-blue-600"
                />
                <label
                  htmlFor="email-option"
                  className="ml-2 text-gray-700 font-medium"
                >
                  Email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sms-option"
                  type="radio"
                  value="sms"
                  checked={resetOption === "sms"}
                  onChange={() => setResetOption("sms")}
                  className="form-radio text-blue-600"
                />
                <label
                  htmlFor="sms-option"
                  className="ml-2 text-gray-700 font-medium"
                >
                  Text Message (SMS)
                </label>
              </div>
            </div>

            {resetOption === "email" ? (
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  We will send you an email with instructions on how to reset
                  your password.
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            ) : (
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-2"
                >
                  We will text you a verification code to reset your password.
                  Message and data rates may apply.
                </label>
                <div className="flex">
                  <select
                    title="country code"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="p-3 border border-gray-300 rounded-l-lg"
                  >
                    {countryCodes.map((item) => (
                      <option
                        key={item.code}
                        value={item.code}
                      >{`${item.name} ${item.code}`}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-r-lg"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
            >
              Email Me
            </button>
          </form>
          <div className="mt-4">
            <a
              href="#"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              I don't remember my email or phone.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
