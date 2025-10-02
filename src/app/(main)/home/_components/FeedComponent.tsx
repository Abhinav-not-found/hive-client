"use client";
import { useState, useEffect, useRef } from "react";
import Card from "@/components/general/Card";
import { getFeed } from "@/helpers/postHelper";

interface Post {
  _id: string;
  description: string;
  userId: string;
}

const FeedComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      const res = await getFeed(page, 10);

      setPosts((prev) => {
        const allPosts = [...prev, ...res.data];
        const uniquePosts = Array.from(
          new Map(allPosts.map((p) => [p._id, p])).values()
        );

        if (uniquePosts.length >= res.total) setHasMore(false);

        return uniquePosts;
      });

      setLoading(false);
    };

    fetchPosts();
  }, [page, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "200px" }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div className='h-full w-full py-2 flex items-center md:items-end flex-col gap-4 mt-2 md:mt-4'>
      {posts.map((post) => (
        <Card key={post._id} data={post} />
      ))}

      {loading &&
        Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className='h-72 md:h-80 w-[19rem] md:w-full max-w-[24rem] bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse'
          />
        ))}

      <div ref={loadMoreRef}></div>
    </div>
  );
};

export default FeedComponent;
