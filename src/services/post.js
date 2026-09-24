export class PostService {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async getPosts(category, take) {
    return await this.postRepository.getAll(category, take);
  }

  async getPostById(id) {
    return await this.postRepository.getById(id);
  }

  async createPost(data) {
    return await this.postRepository.addPost(data);
  }
}