const { tryCatchHandler } = require("../helpers/error-handler");
const { generateToken } = require("../config/jwt.config");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const bcryptSalt = process.env.BCRYPT_SALT;
const addUser = tryCatchHandler(async (req) => {
  const userExist = await User.count({
    phone_number: req.body.phone_number,
  }).lean();

  if (userExist) throw new Error("User already exists!!");
  else {
    req.body.password = await bcrypt.hash(
      req.body.password,
      Number(bcryptSalt)
    );
    const user = await User.create(req.body);
    return {
      message: "succcess",
      user: user,
    };
  }
});

const loginUser = tryCatchHandler(async (req, res) => {
  let user = await User.findOne({ phone_number: req.body.phone_number }).lean();

  if (!user) {
    throw new Error("User does not exist!!");
  } else {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (passwordMatch) {
      const token = await generateToken(
        { id: user._id },
        process.env.JWT_SECRET,
        {}
      );

      delete user.password;
      delete user._id;
      res.status(200).json({ message: "success", token: token, user: user });
    } else {
      throw new Error("Incorrect password!!");
    }
  }
});

module.exports = {
  loginUser,
  addUser,
};
