import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { resetUser } from "../redux/slices/userDataSlice";
export default function Navbar() {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("JWT");
    dispatch(resetUser());
  };
  return (
    <header className="container mx-auto px-4 py-10 flex items-center justify-between">
      <Link to={"/"} className="hover:text-white text-3xl font-light">
        PoX
      </Link>
      <nav className="flex gap-5">
        <NavLink to={"/"}>Home</NavLink>
        {!user._id ? (
          <>
            <NavLink to={"/register"}>Register</NavLink>
            <NavLink to={"/login"}>Login</NavLink>
          </>
        ) : (
          <>
            <NavLink to={"/users"}>Users</NavLink>
            <Link onClick={() => handleLogout()} to={null}>
              Logout
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
