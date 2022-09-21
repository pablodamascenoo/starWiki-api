import { Router } from "express";
import authController from "../controllers/authController.js";
import schemaValidator from "../middleware/schemaValidator.js";
import verifyToken from "../middleware/tokenValidator.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  schemaValidator(signUpSchema),
  authController.signUp
);
authRouter.post(
  "/sign-in",
  schemaValidator(signInSchema),
  authController.signIn
);
authRouter.get("/health", verifyToken, authController.health);

export default authRouter;
