import type { Post } from "../data/posts.ts";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <span className="category">{post.category}</span>

      <h2>{post.title}</h2>

      <p className="post-content">{post.content}</p>

      <p className="post-author">Автор: {post.author}</p>
    </article>
  );
}