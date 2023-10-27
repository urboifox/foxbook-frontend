import axios from "axios";
import { API_LINK } from "../constants";

const changeUserRole = async (id, role) => {
  return axios
    .patch(
      `${API_LINK}/api/users/${id}`,
      {
        role: role === "admin" ? "user" : "admin",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });
};

export default changeUserRole;
