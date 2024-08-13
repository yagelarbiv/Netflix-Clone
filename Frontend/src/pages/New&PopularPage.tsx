import MovieSlider from "../components/MovieSlider";
import Navbar from "../components/Navbar";
import { NEW_AND_POPULAR_CATEGORIES } from "../utils/constants";


function NewAndPopularPage() {
  return (
    <div className="min-h-screen bg-black text-white">
        <Navbar />
      <div className='flex flex-col gap-10 bg-black py-10'>
        {
          NEW_AND_POPULAR_CATEGORIES.map((item, index) => <MovieSlider key={index} category={item.category} contType={item.content} title={item.title} />)
        }
      </div>
    </div>
  )
}

export default NewAndPopularPage;


