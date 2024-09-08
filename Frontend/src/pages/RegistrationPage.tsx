import { Link } from "react-router-dom"
import SignUpNavbar from "../components/SignUpNavbar"

const RegistrationPage = () => {
    const email = new URLSearchParams(window.location.search).get('email')
    return (
        <>
            <SignUpNavbar />

            <div className="flex flex-col items-center justify-center bg-white">
                <div className="text-center">

                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg mt-24">
                        <img src="../public//SetupLogo.png" alt="Setuplogo" className="w-72 ml-14 mb-6" />

                        <h2 className="text-gray-500 text-sm font-semibold">STEP 1 OF 3</h2>
                        <h1 className="mt-2 text-3xl font-semibold">Finish setting up your account</h1>
                        <p className="mt-2 text-lg text-black">Netflix is personalized for you. Create <br /> a password to start watching Netflix.</p>
                    </div>

                    <Link to={'/signup?email=' + email}>
                        <button
                            className="w-80 h-16 mt-1 bg-red-600 text-white text-2xl font-semibold py-3 px-12 rounded-md hover:bg-red-700 transition">
                            Next
                        </button>
                    </Link >
                </div>
            </div >
        </>
    )
}

export default RegistrationPage
