const { Router } = require("express");
const { addUser, login } = require("./controllers");
const { hashPass, unHash, decrypt } = require("../middleware");
const userRouter = Router();

userRouter.post("/user", hashPass, addUser); //defining a post request on /user path, that calls
userRouter.post("/login", unHash, login);
userRouter.get("/user", decrypt, login);

module.exports = userRouter;