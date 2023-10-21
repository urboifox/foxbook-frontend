import { API_LINK } from "../../../constants";
import { Link } from "react-router-dom";
import { CloseIcon } from "../../icons";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function Post({ post, fetchPosts }) {
  // console.log(post);
  const [deleting, setDeleting] = useState(false);
  const handlePostDelete = () => {
    if (!deleting) {
      setDeleting(true);
      axios
        .delete(`${API_LINK}/api/posts/${post._id}`)
        .then(() => {
          fetchPosts();
        })
        .catch((error) => {
          console.error(`Error deleting post: ${error.message}`);
        })
        .finally(() => {
          setDeleting(false);
        });
    }
  };

  const isAdmin = useSelector((state) => state.user.data.role === "admin");

  return (
    <article className="bg-neutral-800 p-5 flex flex-col gap-4 rounded-md">
      <header className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link to={`/users/${post.user._id}`}>
            <img
              loading="lazy"
              src={`${API_LINK}/uploads/${post.user.avatar}`}
              alt={`${post.user.firstName} avatar`}
              className="w-10 aspect-square object-cover rounded-full"
            />
          </Link>
          <div className="flex flex-col gap-1">
            <Link to={`/users/${post.user._id}`}>{`${
              post.user.firstName || ""
            } ${post.user.lastName || ""}`}</Link>
            <span className=" text-xs text-neutral-400">
              {post.date.split("T")[1].split(".")[0].substring(0, 5)}
            </span>
          </div>
        </div>
        {isAdmin && (
          <div
            onClick={() => handlePostDelete()}
            className="group cursor-pointer"
          >
            <CloseIcon
              className={`${
                deleting ? "opacity-50" : ""
              } fill-white group-hover:fill-red-600 transition-colors w-6`}
            />
          </div>
        )}
      </header>
      <figure>
        <h2 className="font-semibold text-main-100">{post.title}</h2>
        <p className="mt-2 font-normal text-neutral-300">{post.content}</p>
        {post.image && (
          <img
            className="mt-5 rounded-md h-60 w-full object-cover"
            loading="lazy"
            src={`${API_LINK}/uploads/${post.image}`}
            alt={`${post.title} image`}
          />
        )}
      </figure>
    </article>
  );
}
