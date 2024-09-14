import Hashtag from "../models/hashtag.model.js";

class HashtagRepository {
  async create(data) {
    try {
      const hashtag = await Hashtag.create(data);
      return hashtag;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async get(id) {
    try {
      const hashtag = Hashtag.findById(id);
      return hashtag;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async destroy(id) {
    try {
      const result = await Hashtag.findOneAndDelete(id);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findByName(titleList) {
    try {
      const result = await Hashtag.find({
        title: titleList,
      });
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async bulkCreate(data) {
    // In place of data => we have to pass an array
    try {
      const tags = await Hashtag.insertMany(data);
      return tags;
    } catch (error) {
      console / log(error);
      return error;
    }
  }
}

export default HashtagRepository;
