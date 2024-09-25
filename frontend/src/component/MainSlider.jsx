import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";

const MainSlider = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {data?.map((movie) => (
        // <MovieCard key={movie._id} movie={movie} />
        <div key={movie._id} className="relative group object-cover border-[4px] rounded-lg">
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-[30vh] md:h-[90vh] m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-50"
            />

          <p className="absolute top-[65%] font-semibold text-lg md:text-3xl left-[2rem] right-0 bottom-0 transition duration-300 ease-in-out">
            {movie.name}
          </p>
          <p className="absolute top-[70%] text-[12px] md:text-lg left-[2rem] right-0 bottom-0 transition duration-300 ease-in-out w-[80%] md:w-[60%] hidden md:block">
            {movie.detail}
          </p>
          <Link to={`/movies/${movie._id}`} className="absolute top-[85%] left-[2rem] font-bold">
              <button className="flex items-center gap-2 px-3 py-2 border rounded-md bg-black opacity-50 hover:opacity-90"><MdPlayArrow size={25}/>Watch movie</button>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default MainSlider;
