import axios from "axios";
import { useState } from "react";
import { PrimaryButton } from "../../";
import useForm from "../../../hooks/useForm";
import { API_LINK } from "../../../constants";
import getUserData from "../../../lib/getUserData";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/userDataSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { data, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSetUserData = (user) => {
    dispatch(setUser(user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${API_LINK}/api/users/login`, data)
      .then(({ data }) => {
        const token = data.data.token;
        localStorage.setItem("JWT", token);
      })
      .then(() => {
        getUserData().then((user) => handleSetUserData(user));
      })
      .then(() => {
        navigate("/");
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
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col gap-5 max-w-xl mx-auto"
    >
      <input
        value={data.email}
        onChange={(e) => handleChange(e)}
        placeholder="Email"
        type="email"
        name="email"
        id="email"
      />
      <input
        value={data.password}
        onChange={(e) => handleChange(e)}
        placeholder="Password"
        type="password"
        name="password"
        id="password"
      />
      <PrimaryButton
        className={`${loading ? "opacity-50" : ""}`}
        loading={loading}
      >
        {loading ? "Loggin in..." : "Login"}
      </PrimaryButton>
    </form>
  );
}
