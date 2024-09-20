import User from "../models/user.model.js";
import CrudRepository from "./crud.repository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByData(data) {
    try {
      const response = await User.findOne(data);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default UserRepository;
