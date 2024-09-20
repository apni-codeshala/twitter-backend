import express from "express";
import { createTweet } from "../../controllers/tweet.controller.js";
import { toggleLike } from "../../controllers/like.controller.js";
import { createComment } from "../../controllers/comment.controller.js";
import { signup, signin } from "../../controllers/user.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";

const router = express.Router();

router.post("/tweet", authenticate, createTweet);
router.post("/likes/toggle", authenticate, toggleLike);
router.post("/comment", authenticate, createComment);
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
