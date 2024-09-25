import React from "react";
import {
  useGetAllFavoritesQuery,
  useDeleteFavoriteMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import MovieCard from "./MovieCard";
import { MdDeleteForever } from "react-icons/md";
import poster from "../../assets/poster.jpg"

function MovieFavorites() {
  const {
    data: favorites,
    error,
    isLoading,
    refetch,
  } = useGetAllFavoritesQuery();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const handleDeleteFavorite = async (movieId) => {
    try {
      await deleteFavorite(movieId).unwrap();
      toast.success("Movie removed from favorites");
      refetch(); // Refetch the favorite movies list after deletion
    } catch (error) {
      toast.error("Failed to remove movie from favorites");
      console.error("Error deleting favorite movie: ", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    toast.error("Please login to view your favorite movies list.");
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold">Favorite Movies</h2>
      <img className="w-full h-[20rem] my-8" src={poster} alt="" />
      {favorites.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div key={movie._id} className="relative group">
              <MovieCard movie={movie} />
              <button
                onClick={() => handleDeleteFavorite(movie._id)}
                className="absolute top-3 right-3 md:right-8 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <MdDeleteForever size={30} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieFavorites;
