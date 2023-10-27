import { API_LINK } from "../constants";
import axios from "axios";

const getUserData = async () => {
  const token = localStorage.getItem("JWT");
  return await axios
    .get(`${API_LINK}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data.user)
    .catch((error) => {
      console.log(error);
    });
};

export default getUserData;
