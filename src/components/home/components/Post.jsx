import { API_LINK } from "../../../constants";
import { Link } from "react-router-dom";
import { CloseIcon, EditIcon } from "../../icons";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./Post.css";
export default function Post({ post, fetchPosts }) {
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handlePostDelete = () => {
    if (!deleting) {
      setDeleting(true);
      axios
        .delete(`${API_LINK}/api/posts/${post._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        })
        .then(() => {
          if (fetchPosts) {
            fetchPosts();
          }
        })
        .then(() => {
          toast.success(`Post deleted successfully`);
        })
        .catch((error) => {
          console.error(`Error deleting post: ${error.message}`);
        })
        .finally(() => {
          setDeleting(false);
        });
    }
  };

  const isAdmin = useSelector((state) => state.user.data?.role === "admin");
  const isMine = post.user._id === useSelector((state) => state.user.data?._id);

  return (
    <article className="bg-neutral-800 p-5 flex flex-col gap-4 rounded-md">
      <header className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link to={`/users/${post.user._id}`}>
            <img
              loading="lazy"
              src={`${post.user.avatar}`}
              alt={`${post.user.firstName} avatar`}
              className="w-10 aspect-square object-cover rounded-full"
            />
          </Link>
          <div className="flex flex-col gap-1">
            <Link to={`/users/${post.user._id}`}>{`${
              post.user.firstName || ""
            } ${post.user.lastName || ""}`}</Link>
            <span className=" text-xs text-neutral-400">
              {`${new Date(post.date).toUTCString()}`}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isMine && (
            <Link to={`/posts/edit/${post._id}`} className="cursor-pointer">
              <EditIcon
                className={`stroke-white w-5 transition-colors duration-200 hover:stroke-main-100`}
              />
            </Link>
          )}
          {(isAdmin || isMine) && (
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
        </div>
      </header>
      <figure>
        <h2 className="font-semibold text-main-100">{post.title}</h2>
        <p className="mt-2 font-normal text-neutral-300">{post.content}</p>
        {post.image && (
          <img
            onClick={() => setModalOpen(true)}
            className="mt-5 rounded-md h-60 w-full object-cover"
            loading="lazy"
            src={`${post.image}`}
            alt={`${post.title} image`}
          />
        )}
      </figure>

      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="w-full h-full modal-container fixed top-0 left-0 flex items-center justify-center"
        >
          <div className="md:w-1/2 bg-neutral-800 p-5 rounded-md">
            <img
              onClick={() => setModalOpen(false)}
              className="max-w-full"
              src={`${post.image}`}
              alt={`${post.title} image`}
            />
          </div>
        </div>
      )}
    </article>
  );
}
