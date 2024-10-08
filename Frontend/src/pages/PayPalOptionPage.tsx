import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpNavbar from "../components/SignUpNavbar";
import useAuthStore from '../store/authUser';

const PayPalOptionPage = () => {
    const signup = useAuthStore((state: { signup: (credentials: unknown) => Promise<void>; }) => state.signup);
    const user = localStorage.getItem("user")?.toString();
    const { email, password } = JSON.parse(user || "{}");
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate input
        if (!inputValue) {
            setErrorMessage("Please enter your email or mobile number.");
            return;
        }

        const username = email.split("@")[0];
        
        // Proceed with signup if input is valid
        console.log(email, password);
        signup({ email, username, password });
        navigate("/");
    };

    return (
        <>
            <SignUpNavbar/>

            <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md mt-12">
                <div className="text-center mb-6">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                        alt="PayPal"
                        className="mx-auto h-8"
                    />
                    <h1 className="text-2xl font-bold mt-4">Pay with PayPal</h1>
                    <p className="text-gray-600 mt-2">Enter your email or mobile number to get started.</p>
                </div>

                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email or mobile number"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setErrorMessage('');  // Clear error on input change
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {errorMessage && (
                        <div className="text-red-600 text-sm mb-4">
                            {errorMessage}
                        </div>
                    )}

                    <div className="flex justify-between mb-4 text-blue-500">
                        <a href="#" className="text-sm hover:underline">Forgot email?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    >
                        Next
                    </button>

                    <div className="text-center text-gray-500 mb-4">
                        <span>or</span>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-gray-100 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Create an account
                    </button>
                </form>

                <div className="text-center mt-6 text-sm">
                    <a href="#" className="text-gray-500 hover:underline">Cancel and return to Netflix.com</a>
                </div>

                <div className="text-center mt-4">
                    <div className="inline-block mr-2">
                        <img src="https://img.icons8.com/color/48/usa.png" alt="USA" className="h-4 w-4 inline-block" />
                        <span className="text-sm text-gray-500">English</span>
                    </div>
                    <a href="#" className="text-sm text-gray-500 hover:underline mx-1">Français</a>
                    <a href="#" className="text-sm text-gray-500 hover:underline mx-1">Español</a>
                    <a href="#" className="text-sm text-gray-500 hover:underline mx-1">中文</a>
                </div>
            </div>
        </>
    );
};

export default PayPalOptionPage;
