import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
  useAddFavoriteMutation, // Thêm hook để thêm phim vào danh sách yêu thích
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import { FaHeart } from "react-icons/fa";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [isPlaying, setIsPlaying] = useState(false);
  const [addFavorite, { isLoading: loadingFavorite }] =
    useAddFavoriteMutation(); // Khai báo hook để thêm vào yêu thích

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  // Hàm để thêm phim vào danh sách yêu thích
  const handleAddToFavorites = async () => {
    try {
      await addFavorite(movieId).unwrap();
      toast.success("Movie added to favorites!");
    } catch (error) {
      toast.error("Movie is already in favorites");
    }
  };

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[20rem]"
        >
          Go Back
        </Link>
      </div>

      <div className="mt-[2rem] mx-2">
        <div className="flex flex-col justify-center items-center">
          {/* Hiển thị hình ảnh nếu chưa nhấn play */}
          {!isPlaying && (
            <div className="relative w-[90%] md:w-[70%]">
              <img
                src={movie?.image}
                alt={movie?.name}
                className="w-full rounded mb-4 h-[30vh] md:h-[90vh] border-4"
              />
              {/* Nút Play */}
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white bg-black bg-opacity-50 rounded-full p-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-6.197-3.696A1 1 0 007 8.257v7.486a1 1 0 001.555.832l6.197-3.696a1 1 0 000-1.664z"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Hiển thị video YouTube khi nhấn nút Play */}
          {isPlaying && (
            <iframe
              width="90%"
              height="600"
              src={movie?.linkmovie}
              title={movie?.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded"
            ></iframe>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddToFavorites}
            className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded flex items-center gap-2 ${
              loadingFavorite ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loadingFavorite}
          >
            <FaHeart />
            Add to Favorites
          </button>
        </div>
        {/* Container One */}
        <div className="max-w-screen-lg mx-auto">
          <section>
            <h2 className="text-xl md:text-5xl my-4 font-extrabold">{movie?.name}</h2>
            <p className="text-sm md:text-lg my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
              {movie?.detail}
            </p>
          </section>

          <div className="mr-[5rem]">
            <p className="text-md md:text-2xl font-semibold">
              Releasing Date: {movie?.year}
            </p>

            <div className="mt-4">
            <p className="text-md md:text-2xl font-semibold">
              Cast:
            </p>
            <ul className="text-sm px-4">
              {movie?.cast.map((c) => (
                  <li className="mt-[0.5rem]"  key={c._id}>{c}</li>
                ))}
                </ul>
            </div>
          </div>
        </div>

        <div className="max-w-screen-lg mx-auto">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
