import { UserRepository } from "../repository/index.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.userRepository.findByData({ email });
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async signIn(email, password) {
    try {
      const user = await this.userRepository.findByData({ email });
      if (!user) {
        throw new Error("No user found");
      }
      if (!user.comparePassword(password)) {
        return new Error("Incorrect Password");
      }
      const token = user.genJWT();
      return token;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default UserService;
