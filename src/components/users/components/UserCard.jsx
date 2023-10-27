import { Link } from "react-router-dom";
import { API_LINK } from "../../../constants";
import { useSelector } from "react-redux";
import { CloseIcon } from "../../icons";
import { useState } from "react";
import axios from "axios";
import changeUserRole from "../../../lib/handleUserRole";

export default function UserCard({ user, fetchUsers }) {
  const isAdmin = useSelector((state) => state.user.data?.role === "admin");
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUserDelete = (userId) => {
    if (!deleting) {
      setDeleting(true);
      axios
        .delete(`${API_LINK}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        })
        .catch((error) => {
          console.error(`Error deleting user: ${error.message}`);
        })
        .finally(() => {
          setDeleting(false);
          fetchUsers();
        });
    }
  };

  const handleUserRole = () => {
    setLoading(true);
    changeUserRole(user._id, user.role).finally(() => {
      setLoading(false);
      fetchUsers();
    });
  };

  return (
    <article
      className={`${deleting && "opacity-50"} ${
        loading ? "opacity-30" : ""
      } relative p-4 rounded-md items-center text-center flex gap-2 flex-col group bg-neutral-800`}
    >
      {isAdmin && (
        <span
          onClick={() => handleUserDelete(user._id)}
          className="absolute right-2 top-2 cursor-pointer"
        >
          <CloseIcon className={`fill-white hover:fill-red-600 w-3`} />
        </span>
      )}

      <span
        className={`mb-2 cursor-pointer ${
          user.role === "admin" ? "bg-green-200" : "bg-main-200"
        } text-xs opacity-75 group-hover:opacity-100 transition-opacity duration-200 text-black px-4 rounded-sm capitalize`}
      >
        {user.role}
      </span>
      {isAdmin && (
        <span
          onClick={handleUserRole}
          className={`mb-2 cursor-pointer ${
            user.role === "admin" ? "bg-main-200" : "bg-green-200"
          } absolute opacity-0 text-xs group-hover:opacity-100 transition-opacity duration-200 text-black px-4 rounded-sm capitalize`}
        >
          {user.role === "admin" ? "Demote to user" : "Promote to admin"}
        </span>
      )}
      <Link
        className="flex flex-col items-center gap-2"
        to={`/users/${user._id}`}
      >
        <img
          className="w-20 aspect-square object-cover rounded-full"
          src={`${user.avatar}`}
        />
        <h2>{`${user.firstName} ${user.lastName}`}</h2>
      </Link>
    </article>
  );
}
