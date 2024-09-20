import UserService from "../services/user.service.js";

const userService = new UserService();

export const signup = async (req, res) => {
  try {
    const response = await userService.signUp({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully create a new user",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      err: error,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password,
    );
    return res.status(200).json({
      success: true,
      message: "Successfully signin a user",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      err: error,
    });
  }
};
