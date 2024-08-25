import SignUpNavbar from "../components/SignUpNavbar"

const RegistrationPage = () => {
    return (
        <>
            <SignUpNavbar />

            <div className="flex flex-col items-center justify-center bg-white">
                <div className="text-center">
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg mt-12">
                        <img src="/SetupLogo.png" alt="Setuplogo"/>                       
                        <h2 className="text-gray-500 text-sm font-semibold">STEP 3 OF 3</h2>
                        <h1 className="mt-2 text-4xl font-semibold">Finish setting up your account</h1>
                        <p className="mt-2 text-lg text-black">Netflix is personalized for you.<br /> Create a password to start watching <br /> Netflix.</p>

                    </div>
                    <button
                        className="w-80 h-16 mt-1 bg-red-600 text-white text-2xl font-semibold py-3 px-12 rounded-md hover:bg-red-700 transition">
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default RegistrationPage
