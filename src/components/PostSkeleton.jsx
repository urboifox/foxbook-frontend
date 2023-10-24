import Skeleton from "react-loading-skeleton";

export default function PostSkeleton() {
  return (
    <article className="bg-neutral-800 p-5 flex flex-col gap-4 rounded-md">
      <header className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div>
            <Skeleton circle width={40} height={40} />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton width={120} />
            <Skeleton width={100} />
          </div>
        </div>
        <div className="group cursor-pointer">
          <Skeleton circle width={24} height={24} />
        </div>
      </header>
      <figure>
        <h2 className="font-semibold text-main-100">
          <Skeleton width={200} />
        </h2>
        <p className="mt-2 font-normal text-neutral-300">
          <Skeleton count={2} />
        </p>
        <Skeleton height={200} />
      </figure>
    </article>
  );
}
