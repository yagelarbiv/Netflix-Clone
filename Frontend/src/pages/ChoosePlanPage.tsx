import { Link } from "react-router-dom"
import SignUpNavbar from "../components/SignUpNavbar"

const ChoosePlanPage = () => {
    return (
        <>
            <SignUpNavbar />


            <div className="flex flex-col items-center justify-center bg-white">
                <div className="text-center">
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg mt-12">

                        <img src="../public/CheckMarkLogo.png" alt="Check mark logo" className="w-20 ml-24 mb-5" />

                        <h2 className="text-gray-500 text-sm font-semibold">STEP 2 OF 3</h2>
                        <h1 className="mt-2 text-3xl font-semibold">Choose your plan.</h1>

                        <div className="flex items-center">
                            <div className="mr-3 mt-4">
                                <img src="../public/CheckMark.png" alt="Check mark" className="w-10" />
                                <img src="../public/CheckMark.png" alt="Check mark" className="w-10 py-7" />
                                <img src="../public/CheckMark.png" alt="Check mark" className="w-10" />
                            </div>

                            <div className="flex-1 text-left mt-5">
                                <p className="mt-3 text-lg text-black">No commitments, cancel <br /> anytime.</p>
                                <p className="mt-3 text-lg text-black">Everything on Netflix for one <br /> low price.</p>
                                <p className="mt-3 text-lg text-black">Unlimited viewing on all your <br /> devices.</p>
                            </div>
                        </div>
                    </div>

                    <Link to='/plan'>
                        <button
                            className="w-80 h-16 mt-1 bg-red-600 text-white text-2xl font-semibold py-3 px-12 rounded-md hover:bg-red-700 transition">
                            Next
                        </button>
                    </Link>
                    
                </div>
            </div>
        </>
    )
}

export default ChoosePlanPage