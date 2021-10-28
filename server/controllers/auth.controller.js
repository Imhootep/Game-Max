const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const nodemailer = require('nodemailer');
var uniqueString = "";
var resetPass = ";"
const maxAge = 2 * 24 * 60 * 60 * 1000;
const bcrypt = require('bcrypt');


const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

// -----------------------------------------------------------------------

const randomString = () => {
  const len = 40
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
            Cliquez <a href=http://localhost:8000/api/user/validation/${uniqueString}> sur ce lien </a> pour vérifier et confirmer votre adresse email.<br>
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
  console.log("J'entre dans validateUser avec comme uniqueString : " + uniqueString)
  const user = await UserModel.updateOne(
    {uniqueString: uniqueString}, {$set: {isValid: true}}
  )
  if(user){
    res.status(201).send("Validation done.");
    uniqueString = "";
  }
  else{
    res.status(404).send("User not found.");
  }
};

// -----------------------------------------------------------------------

module.exports.signUp = async (req, res) => {
  const {pseudo,company, email, password} = req.body
  const isAdmin = false;
  const isDisabled = false;
  const role = "";
  // pas d'expert_role de base vu qu'on ne sait pas le role de l'utilisateur
  uniqueString = randomString();
  const social = {
    discord: "",
    twitter: "",
    youtube: "",
    facebook: "",
    instagram: "",
    twitch: "",
  };
  try {
    const user = await UserModel.create({
      pseudo,
      company,
      email,
      password,
      role,
      isAdmin,
      isDisabled,
      social,
      uniqueString,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
  //Envoi de l'email de confirmation une fois que l'inscription est terminée
  console.log("J'envoie le mail")
  confirmEmail(pseudo, email, uniqueString);

};

// ------------------------------------------------------------------------------------

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    // const emailInsered = await UserModel.findOne(email);
    const user = await UserModel.login(email, password);
    if(user.role == "" ) throw err
    if(user.role != ""){
      const token = createToken(user._id);
      console.log("Token : ",token)
      console.log("User : ",user._id)
      res.status(200).json({ jwt: token, id: user._id, user: user})
    }
  } catch (err){
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
}

// ------------------------------------------------------------------------------------

//mail pour mot de passe oublié
module.exports.forgottenPassword = async (req, res) => {
  let email = req.body.email;
  resetPass = randomString();
  const user = await UserModel.findOne({email: email});
  if(user){
    const salt = await bcrypt.genSalt();
    cryptedPass = await bcrypt.hash(cryptedPass, salt);
    await UserModel.updateone({email: email}, {$set: {password: cryptedPass}});
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
      subject: "<No-Reply>Réinitialisation de votre mot de passe",
      html: `Bonjour ${user.pseudo},<br>
            Votre mot de passe a été réinitialisé.<br>
            Votre nouveau mot de passe est : ${resetPass}.<br>
            Une fois identifié, vous pouvez vous rendre dans la section "Profil" afin de le remplacer par le mot de passe de votre choix.<br>
            Bien amicalement,<br>
            l'équipe Game-Max.<br>
            <img src="../uploads/profil/random-user.png" alt="Gamemax" />
            `
  }
  

    transporter.sendMail(mailOptions, async (err, info) => {
      if(err){
          console.log(err)
      }
      else{
          console.log("Email for password reset has been sent successfully to <" + email + "> !");
          await UserModel.updateOne({email: email}, { $set:{ resetString: resetString }}); 
      }
    })
  }  
  else{
    console.log("User not found");
  } 
}

// ------------------------------------------------------------------------------------