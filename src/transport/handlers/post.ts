import type { Request, Response } from "express";
import type { Service } from "../../services/post.types.js";
import type {
  Post,
  CreatePostDto,
  PostsQueryDto,
  PostParamsDto,
  ErrorDto,
} from "../../dto/post.dto.js";

//fsf
export function createPostHandlers(postService: Service) {  
  return {
     async getPosts(req: Request, res: Response){
  try {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
},
async getPostById (req: Request, res: Response){
  try {
    const { id } = req.params;
    const post = await postService.getPostById(Number(id));

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
},

 async createPost(req: Request<{}, {}, CreatePostDto>, res: Response) {
  try {
    const { title, content, authorId, categoryId } = req.body ?? {};

    if (
      typeof title !== "string" || !title.trim() ||
      typeof content !== "string" || !content.trim() ||
      !Number.isSafeInteger(authorId) || authorId <= 0 ||
      !Number.isSafeInteger(categoryId) || categoryId <= 0
    ) {
      return res.status(422).json({ error: "Invalid post data" });
    }

    const newPost = await postService.createPost({
      title,
      content,
      authorId,
      categoryId,
    });

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}}}