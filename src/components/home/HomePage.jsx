import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./components/Post";
import { API_LINK } from "../../constants";
export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    const fetchedPosts = axios.get(`${API_LINK}/api/posts`);
    fetchedPosts
      .then((data) => data.data.data)
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="container flex flex-col gap-5 mx-auto px-4">
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
