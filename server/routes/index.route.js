import express from 'express';
import adminRoutes from './admin/index.route';

const router = express.Router();

// mount admin routes at /admin-cms
router.use('/admin', adminRoutes);

export default router;
