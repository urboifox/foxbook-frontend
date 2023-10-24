import Skeleton from "react-loading-skeleton";

export default function UserCardSkeleton() {
  return (
    <article className="w-44 relative p-4 rounded-md items-center text-center flex gap-2 flex-col group bg-neutral-800">
      <Skeleton width={60} />
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-full bg-neutral-700 animate-pulse"></div>
        <h2>
          <Skeleton width={100} />
        </h2>
      </div>
    </article>
  );
}
