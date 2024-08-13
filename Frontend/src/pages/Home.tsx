import MovieSlider from "../components/MovieSlider"
import { HOME_PAGE_SLIDER_CATEGORIES } from "../utils/constants"


function Home() {

  return (
    <div className='flex flex-col gap-10 bg-black py-10'>
    {
      HOME_PAGE_SLIDER_CATEGORIES.map((item, index) => <MovieSlider key={index} category={item.category} contType={item.content} />)
    }
    </div>
  )
}

export default Home;
