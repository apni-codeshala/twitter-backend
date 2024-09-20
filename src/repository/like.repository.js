import Like from "../models/like.model.js";
import CrudRepository from "./crud.repository.js";

class LikeRepository extends CrudRepository {
  constructor() {
    super(Like);
  }

  async findByUserAndLikeable(data) {
    try {
      const like = await Like.findOne(data);
      return Like;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default LikeRepository;
