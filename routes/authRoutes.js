import express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routing
//REGISTER ||method post
router.post("/register", registerController);
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, testController);

//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
