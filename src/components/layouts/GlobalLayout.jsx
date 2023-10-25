import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userDataSlice";
import getUserData from "../../lib/getUserData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
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
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Navbar />
        <ToastContainer position="bottom-right" pauseOnHover={false} />
        <Outlet />
      </SkeletonTheme>
    </>
  );
}
