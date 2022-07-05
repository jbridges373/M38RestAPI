const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

exports.hashPass = async (req, res, next) => {
  try {    
    // const tempPass = req.body.password; //grabbed password variable from body, and stored it locally
    // const hashedPass = await bcrypt.hash(tempPass, 8); //hashed the password and stored it in a new constant
    // req.body.password = hashedPass; //stores freshly hashed password back in the req body
    req.body.password = await bcrypt.hash(req.body.password, 8); //all steps above, condensed into 1 line
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.unHash = async (req, res, next) => {
  try {
    req.user = await User.findOne({ username: req.body.username });

    if (
      req.user &&
      (await bcrypt.compare(req.body.password, req.user.password))
    ) {
      next();
    } else {
      throw new Error("Incorrect credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.decrypt = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id: decodedToken._id });
    if (req.user) {
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};