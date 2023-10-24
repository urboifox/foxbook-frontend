import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_LINK } from "../../constants";
import Post from "../home/components/Post";
import Skeleton from "react-loading-skeleton";

export default function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const fetchUser = () => {
    axios
      .get(`${API_LINK}/api/users/${userId}`)
      .then(({ data }) => data.data.user)
      .then((data) => setUser(data))
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    fetchUser();
  });
  return (
    <main className="mb-10 container mx-auto px-4">
      {user._id ? (
        <>
          <div className="flex items-center mt-10 gap-5">
            {user.avatar ? (
              <img
                className="rounded-md w-40 aspect-square object-cover"
                src={`${API_LINK}/uploads/${user.avatar}`}
                alt={`${user.firstName} avatar`}
              />
            ) : (
              <div className="rounded-md w-40 aspect-square object-cover bg-neutral-500"></div>
            )}
            <div>
              <h3 className="text-2xl font-light mb-2">{`${
                user.firstName || ""
              } ${user.lastName || ""}`}</h3>
              <p>
                <span className="text-neutral-400">Age: </span> {user.age}
              </p>
              <p>
                <span className="text-neutral-400">Email: </span> {user.email}
              </p>
              <p>
                <span className="text-neutral-400">Role: </span> {user.role}
              </p>
            </div>
          </div>
          <hr className="my-10" />
          <h2 className="mb-5 text-center font-light text-3xl">
            {user.firstName || "User"}&apos;s Posts
          </h2>
          {user.posts?.length ? (
            <div className="max-w-2xl container flex flex-col gap-5 mx-auto">
              {user.posts
                .map((post) => {
                  return (
                    <article key={post._id}>
                      <Post post={post} />
                    </article>
                  );
                })
                .reverse()}
            </div>
          ) : (
            <p className="text-center mt-10">
              Looks like {user.firstName || "this User"} hasn&apos;t posted
              anything
            </p>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center mt-10 gap-5">
            <div className="rounded-md w-40 aspect-square object-cover">
              <Skeleton height={160} width={160} />
            </div>
            <div>
              <h3 className="text-2xl font-light mb-2">
                <Skeleton width={200} />
              </h3>
              <p>
                <Skeleton width={50} />
              </p>
              <p>
                <Skeleton width={150} />
              </p>
              <p>
                <Skeleton width={100} />
              </p>
            </div>
          </div>
          <hr className="my-10" />

          <div className="flex justify-center">
            <Skeleton width={200} height={30} />
          </div>
        </>
      )}
    </main>
  );
}
