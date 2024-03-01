import { Router } from 'express';
import { articleController } from '../controllers/index.js';
import auth from '../services/auth.js';

const router = Router();

router.get('/', articleController.test);

router.get("/", auth.verifyToken, articleController.getArticlesFromShoplist);
router.post("/", articleController.addArticleToShoplist);
router.patch("/", articleController.modifyArticleFromShoplist);
router.delete("/", articleController.deleteArticleFromShoplist);

export default router;
