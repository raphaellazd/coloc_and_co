import { Router } from "express";
import { authController, ruleController } from "../controllers/index.js";

const router = Router();

router.get("/", authController.verifyToken, ruleController.getRules);
router.patch("/", authController.verifyToken, ruleController.modifyRules);
router.post("/", authController.verifyToken, ruleController.createOrPatchRules);

export default router;
