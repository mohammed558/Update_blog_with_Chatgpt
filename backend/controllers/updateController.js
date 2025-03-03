// backend/controllers/updateController.js
import { fetchAllBlogPosts as fetchPosts, updateBlogPostContent } from '../services/blogService.js';
import { enhanceContent } from '../services/openaiService.js';

export async function updateAllBlogPosts(req, res) {
  try {
    console.log('Received POST request to /api/update-posts');
    const posts = await fetchPosts();
    console.log(`Fetched ${posts.length} posts from the database.`);
    const updatedPosts = [];

    for (const post of posts) {
      if (!post.content) continue;

      const updatedContent = await enhanceContent(post.content);
      await updateBlogPostContent(post._id, updatedContent);
      updatedPosts.push({ id: post._id, title: post.title });
    }

    res.json({
      message: 'Blog posts updated successfully.',
      updatedPosts: updatedPosts,
    });
  } catch (error) {
    console.error('Error updating blog posts:', error);
    res.status(500).json({ error: error.message });
  }
}
export async function fetchAllBlogPosts(req, res) {
  try {
    const posts = await fetchPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching blog posts.' });
  }
}
