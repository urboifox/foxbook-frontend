import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userDataSlice";
import getUserData from "../../lib/getUserData";

export default function GlobalLayout() {
  const dispatch = useDispatch();

  const handleSetUserData = (user) => {
    dispatch(setUser(user));
  };

  useEffect(() => {
    if (localStorage.getItem("JWT")) {
      getUserData().then((user) => handleSetUserData(user));
    }
  });

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
