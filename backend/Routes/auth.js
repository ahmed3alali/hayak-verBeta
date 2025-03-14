import express from 'express'
import { allUsers, deleteUser, forgotPassword, getUserDetails, getUserProfile, loginUser, logout, registerUser, resetPassword, updatePassword, updateProfile, updateUser, uploadAvatar } from '../Controllers/authController.js';
import {isAuthenticatedUser} from '../Middlewares/authChecker.js'

import {authorizeRoles} from "../Middlewares/authChecker.js"

const router = express.Router()
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
 


router.route("/logout").get(logout);
 

router.route("/password/forgot").post(forgotPassword);
 
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser,getUserProfile);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);

router.route("/password/update").put(isAuthenticatedUser,updatePassword);




router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("Admin"),allUsers);

router.route("/admin/users/:id").get(isAuthenticatedUser,authorizeRoles("Admin"),getUserDetails);





router.route("/admin/users/:id").put(isAuthenticatedUser,authorizeRoles("Admin"),updateUser);

router.route("/admin/users/:id").delete(isAuthenticatedUser,authorizeRoles("Admin"),deleteUser);


router.route("/me/upload_avatar").put(isAuthenticatedUser,uploadAvatar);






export default router;