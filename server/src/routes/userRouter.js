import express from "express";
import {registerUser, loginUser, logoutUser, currentUser, updateUser, getAllComplaints, registerComplaint, updateComplaint, deleteComplaint} from "../controllers/userController.js";
import validateToken from "../middlewares/validateToken.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

// protected routes (require authentication)
userRouter.route("/logout").post(validateToken, logoutUser);
userRouter.route("/current").get(validateToken, currentUser);
userRouter.route("/update").put(validateToken, updateUser);

// complaint routes for user
userRouter.route("/complaints/details").get(validateToken, getAllComplaints);
userRouter.route("/complaints/register").post(validateToken, registerComplaint);
userRouter.route("/complaints/update/:id").put(validateToken, updateComplaint);
userRouter.route("/complaints/delete/:id").delete(validateToken, deleteComplaint);

export default userRouter;