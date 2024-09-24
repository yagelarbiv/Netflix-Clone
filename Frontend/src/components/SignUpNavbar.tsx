import { Link } from "react-router-dom"

const SignUpNavbar = () => {
    return (
        <>
            <header className="w-full flex justify-between items-center p-4">
                <Link to={"/"}>
                    <img src="../public/netflix-logo.png" alt="logo" className="w-44 ml-8 mt-1" />
                </Link>
                <Link to={"/login"} className="text-xl font-semibold mr-10">
                    Sign In
                </Link>
            </header>

            <hr className="w-full" />
        </>
    )
}

export default SignUpNavbar





