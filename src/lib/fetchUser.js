import axios from "axios";
import { API_LINK } from "../constants";

const fetchUser = async (userId) => {
  return axios
    .get(`${API_LINK}/api/users/${userId}`)
    .catch((err) => console.log(err.response.data.data.route));
};

export default fetchUser;
