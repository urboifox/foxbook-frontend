import axios from "axios";
import { PrimaryButton } from "../../";
import useForm from "../../../hooks/useForm";
import { API_LINK } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { objectToFormData } from "../../../lib/objectToFormData";
import { useState } from "react";

export default function RegisterForm() {
  const { data, handleChange, resetForm } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = objectToFormData(data);

    axios
      .post(`${API_LINK}/api/users/register`, formData)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
        resetForm();
      });
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col gap-5 max-w-xl mx-auto"
    >
      <input
        value={data.firstName}
        onChange={(e) => handleChange(e)}
        placeholder="First name"
        type="text"
        name="firstName"
        id="firstName"
        required
      />
      <input
        value={data.lastName}
        onChange={(e) => handleChange(e)}
        placeholder="Last name"
        type="text"
        name="lastName"
        id="lastName"
        required
      />
      <input
        value={data.age}
        onChange={(e) => handleChange(e)}
        max={100}
        min={18}
        placeholder="Age"
        type="number"
        name="age"
        id="age"
        required
      />
      <input
        value={data.email}
        onChange={(e) => handleChange(e)}
        placeholder="Email"
        type="email"
        name="email"
        required
        id="email"
      />
      <input
        value={data.password}
        onChange={(e) => handleChange(e)}
        placeholder="Password"
        type="password"
        name="password"
        id="password"
        required
      />
      <input
        onChange={(e) => handleChange(e)}
        type="file"
        name="avatar"
        id="avatar"
      />

      <PrimaryButton
        className={`${loading ? "opacity-50" : ""}`}
        loading={loading}
      >
        {`${loading ? "Registering..." : "Register"}`}
      </PrimaryButton>
    </form>
  );
}
