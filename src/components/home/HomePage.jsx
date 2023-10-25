import { useEffect } from "react";
import axios from "axios";
import Post from "./components/Post";
import { API_LINK } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost, PostSkeleton } from "../";
import { setPosts } from "../../redux/slices/postsSlice";
export default function HomePage() {
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
  }, []);

  return (
    <main className="mb-20 max-w-2xl container flex flex-col gap-5 mx-auto px-4">
      {userData?._id && <CreatePost fetchPosts={fetchPosts} />}
      {posts.length ? (
        <>
          {posts.map((post) => {
            return (
              <article key={post._id}>
                <Post post={post} fetchPosts={fetchPosts} />
              </article>
            );
          })}
        </>
      ) : (
        [...Array(10).fill(0)].map((_, index) => <PostSkeleton key={index} />)
      )}
      <p className="mt-10 text-3xl font-light text-center">
        Looks like there are no more posts today
      </p>
      <p className=" text-xl font-light text-center">Come back later!</p>
    </main>
  );
}
