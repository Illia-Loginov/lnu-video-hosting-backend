import { Router } from 'express';
import * as filesController from '../controllers/files.controller.js';
import { uploadMiddleware } from '../middleware/multipart.middleware.js';

const router = Router();

router.route('/').post(uploadMiddleware, filesController.uploadFile);

export default router;
