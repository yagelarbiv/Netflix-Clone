import MovieSlider from "../components/MovieSlider"
import Navbar from "../components/Navbar";
import { HOME_PAGE_SLIDER_CATEGORIES } from "../utils/constants"

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className='flex flex-col gap-10 bg-black py-10'>
        {
          HOME_PAGE_SLIDER_CATEGORIES.map((item, index) => <MovieSlider key={index} category={item.category} contType={item.content}/>)
        }
      </div>
    </div>
  )
}

export default Home;
