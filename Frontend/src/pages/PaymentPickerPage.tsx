import { Link } from "react-router-dom"
import SignUpNavbar from "../components/SignUpNavbar"

const PaymentPickerPage = () => {
    return (
        <>
            <SignUpNavbar />

            <div className="flex flex-col items-center justify-center bg-white">
                <div className="text-center">
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg">

                        <div className="flex items-center justify-center h-full">
                            <img src="/LockLogo.png" alt="Check mark logo" className="w-16 mb-5" />
                        </div>

                        <h2 className="text-gray-500 text-sm font-semibold">STEP 2 OF 3</h2>
                        <h1 className="mt-2 text-2xl font-semibold">Choose how to pay</h1>
                        <p className="mt-2 text-gray-500">Your payment is encrypted and you can change how you pay anytime.</p>
                        <p className="mt-4 text-sm font-semibold text-gray-800">Secure for peace of mind.<br />Cancel easily online.</p>
                        <div className="mt-6 space-y-4">


                            <div className="mt-6 text-gray-500 text-sm">
                                <p className="flex items-center justify-end">
                                    <span className="mb-1">End-to-end encrypted🔒</span>
                                </p>
                            </div>


                            <Link to='/creditoption'>
                                <button className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-100">
                                    <span className="flex items-center">
                                        <span className="mr-3">Credit or Debit Card</span>
                                        <img src="visa.png" alt="Visa" className="h-6" />
                                        <img src="mastercard.png" alt="MasterCard" className="h-6 ml-2" />
                                        <img src="amex.png" alt="Amex" className="h-6 ml-2" />
                                    </span>
                                    <span>→</span>
                                </button>
                            </Link>

                            <Link to='/paypaloption'>
                                <button className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3 mt-2 hover:bg-gray-100">
                                    <span className="flex items-center">
                                        <span className="mr-3">PayPal</span>
                                        <img src="paypal.png" alt="PayPal" className="h-6" />
                                    </span>
                                    <span>→</span>
                                </button>
                            </Link>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPickerPage