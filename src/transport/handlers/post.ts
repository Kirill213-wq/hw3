import type { PostService } from "../../services/post.js";

export class PostHandler {
  postService: PostService;
  constructor(postService: PostService) {
    this.postService = postService;
  }
//fsf
  getPosts = async (req: { query: { category: any; take: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; }) => {
    try {
      const { category, take } = req.query;
      const posts = await this.postService.getPosts(category, take);
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getPostById = async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; }) => {
    try {
      const { id } = req.params;
      const post = await this.postService.getPostById(id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  createPost = async (req: { body: { title: any; content: any; author: any; category: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; }) => {
    try {
      const { title, content, author, category } = req.body;

      if (!title || !content) {
        return res.status(422).json({ error: 'Title and content are required' });
      }

      const newPost = await this.postService.createPost({
        title,
        content,
        author: author || 'Anonymous',
        category: category || 'general'
      });

      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}