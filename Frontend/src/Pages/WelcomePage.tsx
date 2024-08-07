import './WelcomePage.css';
import { useNavigate } from 'react-router-dom'
import WelcomePageHeader from '../components/WelcomePage/WelcomePageHeader'
import FormOption from './../components/WelcomePage/optForm';
import Jumbo from '../components/WelcomePage/Jumbo';
import Footer from '../components/shared/footer';
import AccordionComponent from '../components/WelcomePage/Accordion';


function WelcomePage() {

  const navigate = useNavigate()
  return (
    <div className="WelcomePage">
      <WelcomePageHeader navigate={navigate}>
        <FormOption />
      </WelcomePageHeader>
      <div className='Seperator'></div>
      <Jumbo />
      <FormOption/>
      <AccordionComponent />
      <div className='Seperator'></div>
      <Footer />
    </div>
  )
}

export default WelcomePage
