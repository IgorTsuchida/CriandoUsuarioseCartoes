import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateCardController } from './controllers/cartoes/CreateCardController';
import { isAuthenticated } from './middleware/isAuthenticated';
import { VerifyCardController } from './controllers/cartoes/VerifyCardController';

const router = Router();
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.post('/cartoes', isAuthenticated, new CreateCardController().handle);
router.post('/verifyCard', isAuthenticated, new VerifyCardController().handle);
export { router };