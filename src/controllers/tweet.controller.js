import TweetService from "../services/tweet.service.js";
import upload from "../cofig/file-upload-s3-config.js";

const singleUploader = upload.single("image");
const tweetService = new TweetService();

export const createTweet = async (req, res) => {
  try {
    console.log(req);
    singleUploader(req, res, async function (err, data) {
      if (err) {
        return res.status(500).json({ error: err });
      }
      // console.log("Image url is", req);
      const payload = { ...req.body };
      payload.image = req.file.location;
      const response = await tweetService.create(payload);
      return res.status(201).json({
        success: true,
        message: "Successfully created a new tweet",
        data: response,
        err: {},
      });
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

export const getTweet = async (req, res) => {
  try {
    const response = await tweetService.get(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Successfully get a tweet",
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
