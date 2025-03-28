import { Router } from 'express';

import UserController from '../controllers/userController';

const router = Router();
console.log(1111112)
router.post('/', UserController.createUser);

export default router;