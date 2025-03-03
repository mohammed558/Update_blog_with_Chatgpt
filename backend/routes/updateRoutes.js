// backend/routes/updateRoutes.js
import express from 'express';
import { updateAllBlogPosts, fetchAllBlogPosts } from '../controllers/updateController.js';

const router = express.Router();

router.post('/update-posts', updateAllBlogPosts);
router.get('/fetch-posts', fetchAllBlogPosts);

export default router;
