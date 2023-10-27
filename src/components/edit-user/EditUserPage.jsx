import { useParams } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import fetchUser from "../../lib/fetchUser";
import axios from "axios";
import { API_LINK } from "../../constants";
import { objectToFormData } from "../../lib/objectToFormData";
import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userDataSlice";
import Skeleton from "react-loading-skeleton";
export default function EditUserPage() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { data, handleChange, setData } = useForm({});
  const imageRef = useRef(null);
  useEffect(() => {
    fetchUser(userId).then(({ data }) => setData(data.data.user));
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = objectToFormData(data);
    try {
      await axios
        .patch(`${API_LINK}/api/users/${data._id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        })
        .then(({ data }) => {
          dispatch(setUser(data.data.user));
        })
        .finally(() => {
          toast.success(`Info updated successfully`);
          setLoading(false);
          imageRef.current.value = "";
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="mx-auto container px-4">
      <h1 className="text-2xl pb-5 mb-5 font-light">Edit User Information</h1>
      {data._id ? (
        <form
          className={`${loading ? "opacity-75" : ""}`}
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className=" mb-4 flex items-center gap-4">
            <h3 className="w-20">First name:</h3>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              value={data.firstName}
              name="firstName"
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <h3 className="w-20">Last name:</h3>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              value={data.lastName}
              name="lastName"
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <h3 className="w-20">Email:</h3>
            <input
              onChange={(e) => handleChange(e)}
              type="email"
              value={data.email}
              name="email"
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <h3 className="w-20">Age:</h3>
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              value={data.age}
              name="age"
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <h3 className="w-20">Avatar:</h3>
            <input
              ref={imageRef}
              onChange={(e) => handleChange(e)}
              type="file"
              name="avatar"
            />
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
            <Skeleton width={500} height={60} />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <h3 className="w-20">
              <Skeleton width={50} height={20} />
            </h3>
            <Skeleton width={500} height={60} />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <h3 className="w-20">
              <Skeleton width={50} height={20} />
            </h3>
            <Skeleton width={500} height={60} />
          </div>
          <Skeleton width={120} height={40} />
        </div>
      )}
    </main>
  );
}
