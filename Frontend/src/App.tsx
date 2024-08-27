import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/404";
import UserList from "./pages/UserList";
import NewAndPopularPage from "./pages/New&PopularPage";
import Home from './pages/Home';
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/404";
import UserList from "./pages/UserList";
import NewAndPopularPage from "./pages/New&PopularPage";
import Home from './pages/Home';
import PlanPage from "./pages/PlanPage";
import PaymentPickerPage from "./pages/PaymentPickerPage";
import RegistrationPage from "./pages/RegistrationPage";
import CreditOptionPage from "./pages/CreditOptionPage";
import ChoosePlanPage from "./pages/ChoosePlanPage";
import PayPalOptionPage from "./pages/PayPalOptionPage";

function App() {
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, []);

	if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, []);

	if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
				<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				<Route path="/myList" element={user ? <UserList /> : <Navigate to={"/login"} />} />
				<Route path="/newAndpopular" element={<NewAndPopularPage />} />
				<Route path="/home" element={<Home />} />
				<Route path='/*' element={<NotFoundPage />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/changePassword" element={<ChangePassword />} />
			</Routes>
			<Footer />
			<Toaster />
		</>
	);
	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/registration' element={!user ? <RegistrationPage /> : <Navigate to={"/"} />} />
				<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
				<Route path='/chooseplan' element={!user ? <ChoosePlanPage /> : <Navigate to={"/"} />} />
				<Route path='/plan' element={!user ? <PlanPage /> : <Navigate to={"/"} />} />
				<Route path='/paymentpicker' element={!user ? <PaymentPickerPage /> : <Navigate to={"/"} />} />
				<Route path='/creditoption' element={!user ? <CreditOptionPage/> : <Navigate to={"/"} />} />
				<Route path='/paypaloption' element={!user ? <PayPalOptionPage/> : <Navigate to={"/"} />} />
				<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				<Route path="/myList" element={user ? <UserList /> : <Navigate to={"/login"} />} />
				<Route path="/newAndpopular" element={<NewAndPopularPage />} />
				<Route path="/home" element={<Home />} />
				<Route path='/*' element={<NotFoundPage />} />
			</Routes>
			<Footer />

			<Toaster />
		</>
	);
}

export default App;
export default App;