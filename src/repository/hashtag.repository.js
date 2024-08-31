const Hashtag = require("../models/hashtag.model");

class HashtagRepository {
  async create(data) {
    try {
      const hashtag = await Hashtag.create(data);
      return hashtag;
    } catch (error) {
      console.log(error);
    }
  }

  async get(id) {
    try {
      const hashtag = Hashtag.findById(id);
      return hashtag;
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id) {
    try {
      const result = await Hashtag.findOneAndDelete(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(hashtagId, data) {
    try {
      const result = await Hashtag.findByIdAndUpdate(hashtagId, data);
      return result;
    } catch {
      console.log(error);
    }
  }
}

module.exports = HashtagRepository;
