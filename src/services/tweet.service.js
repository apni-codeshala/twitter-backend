import { TweetRepository } from "../repository/index.js";
import { HashtagRepository } from "../repository/index.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    try {
      const content = data.content;
      let tags = content.match(/#[a-zA-Z0-9]+/g);
      tags = tags.map((tag) => tag.substring(1).toLowerCase());

      // Push tweet to databse
      const tweet = await this.tweetRepository.create(data);

      // Find the already present tag
      let alreadyPresentTag = await this.hashtagRepository.findByName(tags);
      let titleOfAlreadyPresentTag = alreadyPresentTag.map((tag) => tag.title);

      // Now find element which are not present in second array
      let newTags = tags.filter(
        (tag) => !titleOfAlreadyPresentTag.includes(tag),
      );
      newTags = newTags.map((tag) => {
        return { title: tag, tweets: [tweet.id] };
      });

      // create the new hastag that was not present in database
      await this.hashtagRepository.bulkCreate(newTags);

      // Some hashtag already present in them we have to add tweet id
      alreadyPresentTag.forEach((tag) => {
        tag.tweets.push(tweet.id);
        tag.save();
      });

      return tweet;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default TweetService;
