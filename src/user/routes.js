const { Router } = require("express"); //import Router method only from express
const { signUp } = require("./controllers"); //import only signUp from controllers file
const userRouter = Router(); //create a router that can have endpoints added to it

userRouter.post("/user", signUp);//defining a post request on  /user path, that calls the signUp controller

module.exports = userRouter;
