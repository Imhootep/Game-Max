const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
  let token = "";
  const header = req.headers.authorization.split(" ");
  console.log("header : ", header[1])
  if(header[1] != "" && header[1] != "undefined") {  
  token = header[1]
  }
  if (token && token != "" && token != undefined && token != null) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        // console.log("_id : ",user._id)
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  // console.log("On passe par le requireAuth ?")
  let token = "";
  const header = req.headers.authorization.split(" ");
  if(header[1] != "" && header[1] != "undefined") {  
  token = header[1]
  }
  //console.log("Token reqAuth : ",token)
  if (token && token != "" && token != undefined && token != null) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log("_id : ",decodedToken.id);
        next();
      }
    });
  } else {
    res.sendStatus(401).json('No token')
  }
};
