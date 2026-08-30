import { Router } from 'express';
import { UserController } from './user.controller';
import clientInfoParser from '../../middleware/clientInfoParser';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
import { UserRole } from './user.interface';


const router = Router();

router.get('/', auth(UserRole.ADMIN), UserController.getAllUser);

router.get('/me', auth(UserRole.ADMIN, UserRole.USER), UserController.myProfile);

router.post(
   '/',
   clientInfoParser,
   validateRequest(UserValidation.userValidationSchema),
   UserController.registerUser
);
// update profile
router.patch(
   '/update-profile',
   auth(UserRole.USER),
   UserController.updateProfile
);

router.patch(
   '/fcm-token',
   auth(UserRole.ADMIN, UserRole.USER),
   UserController.updateFcmToken
);

router.patch(
   '/:id/status',
   auth(UserRole.ADMIN),
   UserController.updateUserStatus
);

export const UserRoutes = router;
