const posts = [
  { id: 1, title: 'First Post', content: 'Hello World', author: 'Kirill', category: 'general' },
  { id: 2, title: 'JS Async', content: 'Promises and Async/Await', author: 'Alex', category: 'programming' },
  { id: 3, title: 'Express Routing', content: 'Clean Architecture in Express', author: 'Kirill', category: 'programming' },
  { id: 4, title: 'Node.js Basics', content: 'Introduction to Node.js', author: 'John', category: 'programming' }
];

export class PostRepository {
  async getAll(category, take) {
    let result = [...posts];

    if (category) {
      result = result.filter((post) => post.category === category);
    }

    if (take !== undefined) {
      const limit = Number(take);
      result = result.slice(0, limit);
    }

    return result;
  }

  async getById(id) {
    const numericId = Number(id);
    return posts.find((post) => post.id === numericId) || null;
  }

  async addPost({ title, content, author, category }) {
    const newPost = {
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