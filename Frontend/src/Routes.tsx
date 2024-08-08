import { Route, Routes } from 'react-router-dom';
import SigninPage from './Pages/LogIn';
import WelcomePage from './Pages/WelcomePage';
import SignupPage from './Pages/SignUp';
import HomePage from './Pages/HomePage';

/*---> Component <---*/
const App = () => {
  return (
    <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/signin' element={<SigninPage />}/>
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/browse' element={<HomePage />}/>
        <Route path='*'>
          {/* <NotFoundPage /> */}
        </Route>
    </Routes>
  )
}

export default App
