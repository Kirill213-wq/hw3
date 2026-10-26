export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number | null;
  author: { id: number; email: string } | null;
  legacyAuthor: string;
  categoryId: number;
  category: { id: number; name: string };
}