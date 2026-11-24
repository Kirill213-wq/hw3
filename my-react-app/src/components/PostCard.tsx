import type { Post } from "../data/posts.ts";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const authorLabel =
    typeof post.legacyAuthor === "string"
      ? post.legacyAuthor
      : post.legacyAuthor?.email ?? "Невідомий автор";

  return (
    <article className="post-card">
      <span className="category">{post.category.name}</span>

      <h2>{post.title}</h2>

      <p className="post-content">{post.content}</p>

      <p className="post-author">Автор: {authorLabel}</p>
    </article>
  );
}