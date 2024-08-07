import { Route, Routes } from 'react-router-dom';
import SigninPage from './Pages/LogIn';
import WelcomePage from './Pages/WelcomePage';

/*---> Component <---*/
const App = () => {
  return (
    <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/signin' element={<SigninPage />}/>
        <Route path='/signup'>
          {/* <SignupPage /> */}
        </Route>
        <Route path='/browse'>
          {/* <BrowsePage /> */}
        </Route>
        <Route path='*'>
          {/* <NotFoundPage /> */}
        </Route>
    </Routes>
  )
}

export default App
