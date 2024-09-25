import React from 'react';
import { useDeleteUserMutation, useGetAllUserQuery } from '../../redux/api/movies';
import { toast } from "react-toastify";

function Usermanagement() {
  // Gọi hook như một hàm
  const { data: users, error, isLoading } = useGetAllUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  // Hàm xử lý sự kiện xóa người dùng
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId).unwrap();
        toast.success("User deleted successfully!");
      } catch (err) {
        console.error('Failed to delete user:', err);
        toast.error("Failed to delete user");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-screen-lg mx-auto">
      {users?.length > 0 ? (
        <table className="min-w-full text-black bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  {user.isAdmin ? (
                    <span className="text-gray-500">Cannot delete admin</span>
                  ) : (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
  
}

export default Usermanagement;
