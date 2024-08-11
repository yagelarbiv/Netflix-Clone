import { Image } from "react-bootstrap";
import './Jumbo.css';

const jamboList = [
  {
    "id": 1,
    "title": "Enjoy on your TV.",
    "subTitle": "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
    "image": "/src/assets/misc/home-tv.jpg",
    "alt": "Tiger King on NetShow",
    "direction": "row"
  },
  {
    "id": 2,
    "title": "Download your programmes to watch on the go.",
    "subTitle": "Save your data and watch all your favourites offline.",
    "image": "/src/assets/misc/home-mobile.jpg",
    "alt": "Tiger King on NetShow",
    "direction": "row-reverse"
  },
  {
    "id": 3,
    "title": "Watch everywhere.",
    "subTitle": "Stream unlimited films and TV programmes on your phone, tablet, laptop and TV without paying more.",
    "image": "/src/assets/misc/home-imac.jpg",
    "alt": "Money Heist on NetShow",
    "direction": "row"
  }
];

function Jumbo() {
  return (
    <div>
      {
        jamboList.map((item) => (
          <div key={item.id}>
            <div className="JumboItem">
              <div>
                <h1 className="Title">{item.title}</h1>
                <h2 className="SubTitle">{item.subTitle}</h2>
              </div>
              <div>
                <Image className="Image" src={item.image} alt={item.alt} />
              </div>
            </div>
            <div className='Seperator'></div>
          </div>
        ))
      }
    </div>
  )
}

export default Jumbo
