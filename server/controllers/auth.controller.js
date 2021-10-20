const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
const nodemailer = require('nodemailer');
var uniqueString = "";

const maxAge = 2 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

// -----------------------------------------------------------------------

const randomString = () => {
  const len = 20
  let randomStr = ""
  for(let i = 0; i<len; i++){
    const n = Math.floor((Math.random() * 10) + 1) // n est un nombre entre 1 & 10
    randomStr += n
  }
  console.log("uniqueString : " + randomStr)
  return randomStr
}

// -----------------------------------------------------------------------

//Fonction pour l'envoi du mail de confirmation
const confirmEmail = (pseudo, email, uniqueString) => {
  console.log("Je rentre dans confirmEmail");
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'gamemaxbotmailer@gmail.com',
          pass: 'gamemaxmail'
      }
  })

  var mailOptions = {
      from: 'gamemaxbotmailer@gmail.com',
      to: email,
      subject: "<No-Reply>Confirmation de votre adresse email",
      html: `Bonjour ${pseudo}, vous venez de vous enregistrer sur le site de Game-Max.<br>
            Cliquez <a href=http://localhost:3000/confirm/${uniqueString}> sur ce lien </a> pour vérifier et confirmer votre adresse email.<br>
            Bien amicalement,<br>
            l'équipe Game-Max.
            `
  }

  transporter.sendMail(mailOptions, (err, info) => {
      if(err){
          console.log(err)
      }
      else{
          console.log("Email has been sent successfully to <" + email + "> !") 
      }
  })
}

// -----------------------------------------------------------------------

module.exports.validateUser = async (req, res) => {
  const user = await UserModel.findOne(
    {uniqueString: uniqueString}
  )
  if(user) {
    user.isValid = true;
    user.save();
  }
  else{
    res.json("User not found");
  }
};

// -----------------------------------------------------------------------

module.exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body
  const isAdmin = false;
  const isDisabled = false;
  const role = "";
  uniqueString = randomString();

  try {
    const user = await UserModel.create({ pseudo, email, password, role, isAdmin, isDisabled, uniqueString });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
  //Envoi du mail de confirmation après la création du compte
  confirmEmail(pseudo, email, uniqueString);
}

// -----------------------------------------------------------------------

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

// -----------------------------------------------------------------------

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}