// backend/services/blogService.js
import BlogPost from '../models/BlogPost.js';

export async function fetchAllBlogPosts() {
  try {
    return await BlogPost.find({});
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function updateBlogPostContent(id, content) {
  try {
    await BlogPost.findByIdAndUpdate(id, { content: content, updatedAt: new Date() });
    console.log(`Blog post ${id} updated successfully.`);
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
}
