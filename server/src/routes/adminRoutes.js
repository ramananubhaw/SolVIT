import express from "express";
import {getUser, registerAdmin, loginAdmin, logoutAdmin, currentAdmin, deleteUser, getAllComplaints, updateComplaintStatus, deleteComplaint, deleteAdmin, setComplaintPriority} from "../controllers/adminController.js";
import validateToken from "../middlewares/validateToken.js";

const adminRouter = express.Router();

adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/register").post(registerAdmin);

// protected routes (require authentication)
adminRouter.route("/details").get(validateToken, getUser);
adminRouter.route("/logout").post(validateToken, logoutAdmin);
adminRouter.route("/current").get(validateToken, currentAdmin);
adminRouter.route("/delete/user/:reg_no").delete(validateToken, deleteUser);
adminRouter.route("/delete/admin/:id").delete(validateToken, deleteAdmin);

// complaint routes on admin side
adminRouter.route("/complaints/details").get(validateToken, getAllComplaints);
adminRouter.route("/complaints/update").put(validateToken, updateComplaintStatus);
adminRouter.route("/complaints/delete/:id").delete(validateToken, deleteComplaint);
adminRouter.route("/complaints/categorize").post(validateToken, setComplaintPriority);

export default adminRouter;