import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const AllComments = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <div className="px-6">
      <h1 className="text-lime-800 text-2xl font-bold">Comment</h1>
      {movies?.map((movie) => (
        <section key={movie._id} className="my-6">
          <h2 className="text-lg font-bold text-lime-400">{movie.name}</h2> {/* Hiển thị tên bộ phim */}
          {movie.reviews.length > 0 ? (
            movie.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1A1A1A] p-4 rounded-lg mt-4"
              >
                <div className="flex justify-between">
                  <strong className="text-[#B0B0B0]">{review.name}</strong>
                  <p className="text-[#B0B0B0]">
                    {review.createdAt.substring(0, 10)}
                  </p>
                </div>

                <p className="my-4">{review.comment}</p>

                <button
                  className="text-red-500"
                  onClick={() => handleDeleteComment(movie._id, review._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-[#B0B0B0]">No comments for this movie.</p>
          )}
        </section>
      ))}
    </div>
  );
};

export default AllComments;
