/**
 * This is just example code. Add routes here.
 */

import { Router } from 'express';
import { getUserProfile, createUser } from '../controllers/user.controller';

const router = Router();

router.get('/:id', getUserProfile);
router.post('/', createUser);

export default router;