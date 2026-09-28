export class PostService {
  postRepository: any;
  constructor(postRepository: any) {
    this.postRepository = postRepository;
  }

  async getPosts(category: any, take: any) {
    return await this.postRepository.getAll(category, take);
  }

  async getPostById(id: any) {
    return await this.postRepository.getById(id);
  }

  async createPost(data: { title: any; content: any; author: any; category: any; }) {
    return await this.postRepository.addPost(data);
  }
}