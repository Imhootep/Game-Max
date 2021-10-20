const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');


const maxAge = 2 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body
  const isAdmin = false;
  const isDisabled = false;
  const role = "";

  try {
    const user = await UserModel.create({ pseudo, email, password, role, isAdmin, isDisabled });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    // const emailInsered = await UserModel.findOne(email);
    const user = await UserModel.login(email, password);
    // if(user.role == "" ) throw err
    // if(user.role != ""){
    const token = createToken(user._id);
    console.log("Token : ",token)
    console.log("User : ",user._id)
    res.status(200).json({ jwt: token, id: user._id, user: user})
    // }
  } catch (err){
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}