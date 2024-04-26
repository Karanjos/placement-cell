import express from 'express';
import {postApplication, admingetAllApplications, adminUpdateApplicationStatus, adminDeleteApplication, studentgetAllApplication, studentDeleteApplication} from '../controllers/applicationController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/post', isAuthenticated, postApplication);
router.get('/admin/getallapplications', isAuthenticated, admingetAllApplications);
router.get('/student/getallapplications', isAuthenticated, studentgetAllApplication);
router.put('/admin/getallapplications/:id', isAuthenticated, adminUpdateApplicationStatus);
router.delete('/admin/delete/:id', isAuthenticated, adminDeleteApplication);
router.delete('/student/delete/:id', isAuthenticated, studentDeleteApplication);

export default router;