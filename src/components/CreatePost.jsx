import { useSelector } from "react-redux";
import { API_LINK } from "../constants";
import { PrimaryButton } from ".";
import axios from "axios";
import useForm from "../hooks/useForm";
import { objectToFormData } from "../lib/objectToFormData";
import { useRef, useState } from "react";

export default function CreatePost({ fetchPosts }) {
  const userData = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);
  const image = useRef(null);

  const { data, handleChange, resetForm } = useForm({
    title: "",
    content: "",
    // image: null,
    user: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      avatar: userData.avatar,
      _id: userData._id,
    },
  });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    let formData;
    formData = objectToFormData(data);

    axios
      .post(`${API_LINK}/api/posts`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
        resetForm();
        fetchPosts();
        image.current.value = "";
      });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-neutral-800 p-5 flex flex-col gap-5 rounded-md"
      encType="multipart/form-data"
    >
      <div className="flex items-center gap-4">
        <img
          className="w-10 aspect-square rounded-full object-cover"
          src={`${API_LINK}/uploads/${userData.avatar}`}
          alt={`${userData.firstName} image`}
        />
        <input
          onChange={(e) => handleChange(e)}
          required
          value={data.title}
          className="flex-1 rounded-lg"
          placeholder="New Post Title"
          type="text"
          name="title"
          id="title"
        />
      </div>
      <textarea
        name="content"
        id="content"
        className="resize-y"
        onChange={(e) => handleChange(e)}
        value={data.content}
        placeholder="Post Content"
        required
      ></textarea>
      <input
        type="file"
        onChange={(e) => handleChange(e)}
        name="image"
        id="image"
        accept="image/*"
        ref={image}
        className="cursor-pointer text-neutral-400"
      />
      <PrimaryButton
        className={`w-40 ${loading ? "opacity-50" : ""}`}
        loading={loading}
        onClick={() => {}}
      >
        {`${loading ? "Posting..." : "Add Post"}`}
      </PrimaryButton>
    </form>
  );
}
