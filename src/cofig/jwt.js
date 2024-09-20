import JWT from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.model.js";

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const SECRET_KEY = process.env.JWT_PASSPORT_SECRET;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

export const passportAuth = (passport) => {
  try {
    passport.use(
      new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await User.findById(jwt_payload.id);
        if (!user) {
          done(null, false);
        } else {
          done(null, user);
        }
      }),
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};
