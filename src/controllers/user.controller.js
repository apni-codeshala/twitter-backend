import upload from "../cofig/file-upload-s3-config.js";
import UserService from "../services/user.service.js";

const singleUploader = upload.single("image");
const userService = new UserService();

export const signup = async (req, res) => {
  try {
    singleUploader(req, res, async function (err, data) {
      if (err) {
        return res.status(500).json({error: err});
      }
      const payload = {...req.body};
      payload.profilePic = req.file.location;
      const response = await userService.signUp(payload);
      return res.status(200).json({
        success: true,
        message: "Successfully create a new user",
        data: response,
        err: {},
      });
    })
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

export const verifyToken = async (req, res) => {
  try {
    if(req.user) {
      return res.status(200).json({
        success: true,
        message: 'User is authenticted',
        data: {
          name: req.user.name,
          email: req.user.email
        },
        err: {}
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      err: error,
    });
  }
}
