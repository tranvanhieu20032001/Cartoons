import ProductionHouse from "../component/ProductionHouse";
import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <>
      <Header />
      <ProductionHouse/>

      <section className="flex justify-center items-center mt-5">
        <MoviesContainerPage />
      </section>
    </>
  );
};

export default Home;
