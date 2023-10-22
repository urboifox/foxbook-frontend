import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./components/Post";
import { API_LINK } from "../../constants";
import { useSelector } from "react-redux";
import { CreatePost } from "../";
export default function HomePage() {
  const [posts, setPosts] = useState([]);

  const userData = useSelector((state) => state.user.data);
  const fetchPosts = () => {
    const fetchedPosts = axios.get(`${API_LINK}/api/posts`);
    fetchedPosts
      .then((data) => data.data.data)
      .then((data) => {
        setPosts(data.posts.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="mb-20 container flex flex-col gap-5 mx-auto px-4">
      {userData._id && <CreatePost />}
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
