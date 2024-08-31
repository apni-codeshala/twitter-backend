const Tweet = require("../models/tweet.model");

class TweetRepository {
  async create(data) {
    try {
      const tweet = await Tweet.create(data);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async get(id) {
    try {
      const tweet = await Tweet.findById(id);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id) {
    try {
      const result = await Tweet.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.group(error);
    }
  }

  async update(tweetId, data) {
    try {
      const result = await Tweet.findByIdAndUpdate(tweetId, data);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getWithComment(id) {
    try {
      const tweet = await Tweet.findById(id)
        .populate({ path: "comments" })
        .lean();
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(limit, offset) {
    try {
      const tweet = await Tweet.find().skip(offset).limit(limit);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TweetRepository;
