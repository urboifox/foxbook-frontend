import { useEffect } from "react";
import UserCard from "./components/UserCard";
import axios from "axios";
import { API_LINK } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/slices/usersSlice";
import UserCardSkeleton from "../UserCardSkeleton";
import "./UsersPage.css";
export default function UsersPage() {
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  const handleSetUsers = (users) => {
    dispatch(setUsers(users));
  };

  const fetchUsers = () => {
    axios
      .get(`${API_LINK}/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
      })
      .then(({ data }) => data.data)
      .then((data) => handleSetUsers(data.users))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <main id="users" className="flex flex-col container mx-auto px-4 gap-5">
      <h1 className="text-4xl pb-4 border-b">Users</h1>
      <div className="grid usersGrid gap-4">
        {users.length ? (
          <>
            {users.map((user) => {
              return (
                <UserCard fetchUsers={fetchUsers} user={user} key={user._id} />
              );
            })}
          </>
        ) : (
          [...Array(20).fill(0)].map((_, index) => (
            <UserCardSkeleton key={index} />
          ))
        )}
      </div>
    </main>
  );
}
