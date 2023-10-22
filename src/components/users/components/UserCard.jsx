import { Link } from "react-router-dom";
import { API_LINK } from "../../../constants";
import { useSelector } from "react-redux";
import { CloseIcon } from "../../icons";
import { useState } from "react";
import axios from "axios";

export default function UserCard({ user, fetchUsers }) {
  const isAdmin = useSelector((state) => state.user.data?.role === "admin");
  const [deleting, setDeleting] = useState(false);

  const handleUserDelete = (userId) => {
    if (!deleting) {
      setDeleting(true);
      axios
        .delete(`${API_LINK}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        })
        .then(() => {
          fetchUsers();
        })
        .catch((error) => {
          console.error(`Error deleting user: ${error.message}`);
        })
        .finally(() => {
          setDeleting(false);
        });
    }
  };

  return (
    <article
      className={`${
        deleting && "opacity-50"
      } w-44 relative p-4 rounded-md items-center text-center flex gap-2 flex-col group bg-neutral-800`}
    >
      {isAdmin && (
        <span
          onClick={() => handleUserDelete(user._id)}
          className="absolute right-2 top-2 cursor-pointer"
        >
          <CloseIcon className={`fill-white hover:fill-red-600 w-3`} />
        </span>
      )}
      <span className="mb-2 bg-main-200 text-xs opacity-75 group-hover:opacity-100 transition-opacity duration-200 text-black px-4 rounded-sm capitalize">
        {user.role}
      </span>
      <Link
        className="flex flex-col items-center gap-2"
        to={`${API_LINK}/users/${user._id}`}
      >
        <img
          className="w-20 aspect-square object-cover rounded-full"
          src={`${API_LINK}/uploads/${user.avatar}`}
        />
        <h2>{`${user.firstName} ${user.lastName}`}</h2>
      </Link>
    </article>
  );
}
