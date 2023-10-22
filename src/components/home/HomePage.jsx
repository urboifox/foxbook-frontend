import { useEffect } from "react";
import axios from "axios";
import Post from "./components/Post";
import { API_LINK } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../";
import { setPosts } from "../../redux/slices/postsSlice";
export default function HomePage() {
  // const [posts, setPosts] = useState([]);
  const posts = useSelector((state) => state.posts.data);
  const dispatch = useDispatch();

  const handleSetPosts = (posts) => {
    dispatch(setPosts(posts));
  };

  const userData = useSelector((state) => state.user.data);
  const fetchPosts = () => {
    const fetchedPosts = axios.get(`${API_LINK}/api/posts`);
    fetchedPosts
      .then((data) => data.data.data)
      .then((data) => {
        handleSetPosts(data.posts.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchPosts();
  });

  return (
    <main className="mb-20 max-w-2xl container flex flex-col gap-5 mx-auto px-4">
      {userData?._id && <CreatePost fetchPosts={fetchPosts} />}
      {posts.map((post) => {
        return (
          <section key={post._id}>
            <Post post={post} fetchPosts={fetchPosts} />
          </section>
        );
      })}
    </main>
  );
}
