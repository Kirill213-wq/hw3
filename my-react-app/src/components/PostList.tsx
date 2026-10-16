import type { Post } from "../data/posts.ts";
import { PostCard } from "./PostCard.tsx";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}