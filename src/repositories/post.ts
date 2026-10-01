import type {CreatePostDto} from '../dto/post.dto.js';
import type {Post} from '../domain/post/entity.ts';
import type { Repository } from '../domain/post/repository.js';




const posts = [
  { id: 1, title: 'First Post', content: 'Hello World', author: 'Kirill', category: 'general' },
  { id: 2, title: 'JS Async', content: 'Promises and Async/Await', author: 'Alex', category: 'programming' },
  { id: 3, title: 'Express Routing', content: 'Clean Architecture in Express', author: 'Kirill', category: 'programming' },
  { id: 4, title: 'Node.js Basics', content: 'Introduction to Node.js', author: 'John', category: 'programming' }
];

export function creeatePostRepository(): Repository{
  return{

  
  async getAll(category: string, take: number) {
    let result = [...posts];

    if (category) {
      result = result.filter((post) => post.category === category);
    }

    if (take !== undefined) {
      const limit = Number(take);
      result = result.slice(0, limit);
    }

    return result;
  },

  async getById(id: number) {
    const numericId = Number(id);
    return posts.find((post) => post.id === numericId) || null;
  },

async addPost({ title, content, author, category }: CreatePostDto): Promise<Post> {
    const newPost: Post = {
      id: posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
      title,
      content,
      author,
      category
    };

    posts.push(newPost);
    return newPost;
  }
 }
}
