import MainSlider from "../../component/MainSlider";
import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-[95%]">
          <MainSlider data={data} />
        </div>
      </div>
    </>
  );
};

export default Header;
