import express from "express";
import { createTweet } from "../../controllers/tweet.controller.js";
import { toggleLike } from "../../controllers/like.controller.js";
import { createComment } from "../../controllers/comment.controller.js";
import { signup, signin, verifyToken } from "../../controllers/user.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.use(authenticate);
router.post("/verify", verifyToken)
router.post("/tweet", createTweet);
router.post("/likes/toggle", toggleLike);
router.post("/comment", createComment);

export default router;
