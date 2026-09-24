export class PostHandler {
  constructor(postService) {
    this.postService = postService;
  }

  getPosts = async (req, res) => {
    try {
      const { category, take } = req.query;
      const posts = await this.postService.getPosts(category, take);
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getPostById = async (req, res) => {
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

  createPost = async (req, res) => {
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