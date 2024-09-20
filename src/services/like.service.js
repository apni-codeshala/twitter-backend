import {
  LikeRepository,
  TweetRepository,
  CommentRespository,
} from "../repository/index.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
    this.commentRepository = new CommentRespository();
  }

  //api/v1/likes/toggl?id=modelid&type=Tweet
  async toggleLike(modelId, modelType, userId) {
    if (modelType == "Tweet") {
      var likeable = await this.tweetRepository
        .get(modelId)
        .populate({ path: "Likes" });
    } else if (modelType == "Comment") {
      var likeable = await this.commentRepository
        .get(modelId)
        .populate({ path: "Likes" });
    } else {
      throw new Error("Unknown model type");
    }

    // If user like already exists than remove the like
    const exists = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });
    if (exists) {
      likeable.likes.pull(exists.id);
      // save by removing like of tweet
      await likeable.save();
      // remove this like history from like model
      await exists.remove();
      var isAdded = false;
    } else {
      // If like not exist than we have to create a new like
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();
      var isAdded = true;
    }
    return isAdded;
  }
}

export default LikeService;
