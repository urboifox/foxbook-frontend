import axios from "axios";
import { API_LINK } from "../constants";

const fetchPost = async (postId) => {
  return axios
    .get(`${API_LINK}/api/posts/${postId}`)
    .catch((err) => console.log(err.response.data.data.route));
};

export default fetchPost;
