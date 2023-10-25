import { useEffect, useState } from "react";
import fetchPost from "../../lib/fetchPost";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import axios from "axios";
import { API_LINK } from "../../constants";
import Skeleton from "react-loading-skeleton";
export default function EditPostPage() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const { data, handleChange, setData } = useForm({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchPost(postId).then(({ data }) => setData(data.data.post));
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios
        .patch(`${API_LINK}/api/posts/${data._id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        })

        .finally(() => {
          toast.success(`Post updated successfully`);
          setLoading(false);
          navigate("/");
        });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <main className="mx-auto container px-4">
      <h1 className="text-2xl pb-5 mb-5 font-light">Edit Post</h1>
      {data._id ? (
        <form
          className={`${loading ? "opacity-75" : ""}`}
          onSubmit={handleSubmit}
        >
          <div className=" mb-4 flex items-center gap-4">
            <h3 className="w-20">Title:</h3>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              value={data.title}
              name="title"
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <h3 className="w-20">Content:</h3>
            <textarea
              value={data.content}
              onChange={(e) => handleChange(e)}
              name="content"
              className="resize-y"
            ></textarea>
          </div>

          <button
            disabled={loading}
            className="bg-main-100 transition-colors duration-200 hover:bg-main-200 text-black px-8 py-2 rounded-sm font-semibold mt-5"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      ) : (
        <div>
          <div className="mb-4 flex items-center gap-4">
            <h3 className="w-20">
              <Skeleton width={50} height={20} />
            </h3>
            <Skeleton width={200} height={20} />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <h3 className="w-20">
              <Skeleton width={50} height={20} />
            </h3>
            <Skeleton width={500} height={100} />
          </div>
          <Skeleton width={120} height={40} />
        </div>
      )}
    </main>
  );
}
