//Imports
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const nodemailer = require('nodemailer');

//Déclaration de variables/constantes
var uniqueString = "";
var resetPass = "";
var cryptedPass = "";
const maxAge = 2 * 24 * 60 * 60 * 1000;
const bcrypt = require('bcrypt');

// -----------------------------------------------------------------------
//Génération d'un token pour l'authentification
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

// -----------------------------------------------------------------------
//Génération d'un chaîne de 40 caractère aléatoires pour la confirmation d'inscription par email
const randomString = () => {
  const len = 40;
  let randomStr = "";
  for(let i = 0; i<len; i++){
    const n = Math.floor((Math.random() * 10) + 1) // n est un nombre entre 1 & 10
    randomStr += n;
  }
  return randomStr;
}

// -----------------------------------------------------------------------
//Génération d'un nouveau password comportant 15 caractères aléatoires en cas d'oubli de password
const randomResetString = () => {
  const len = 15;
  let randomStr = "";
  const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  for(let i = 0; i<len; i++){
    const n = Math.floor((Math.random() * 36) + 1); // n est un nombre entre 1 & 36
    randomStr += chars[n];
  }

  return randomStr;
}

// -----------------------------------------------------------------------
//Envoi du mail de confirmation d'inscription
const confirmEmail = (pseudo, email, uniqueString) => {
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.MAIL_ADRESS,
          pass: process.env.MAIL_PASS
      }
  })

  var mailOptions = {
      from: 'gamemaxbotmailer@gmail.com',
      to: email,
      subject: "<No-Reply>Confirmation de votre adresse email",
      html: `Bonjour ${pseudo}, vous venez de vous enregistrer sur le site de Game-Max.<br>
            Cliquez <a href=${process.env.API_URL}/api/user/validation/${uniqueString}> sur ce lien </a> pour vérifier et confirmer votre adresse email.<br>
            Vous serez ensuite mis en attente jusqu'à ce qu'un administrateur vous attribue un rôle. Vous pourrez alors vous connecter avec vos identifiants.<br>
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
//Confirmation de l'inscription une fois que le lien dans l'email de confirmation a été cliqué
module.exports.validateUser = async (req, res) => {
  console.log("J'entre dans validateUser avec comme uniqueString : " + req.params.uniqueString)
  const user = await UserModel.findOne(
    {uniqueString: req.params.uniqueString}
  )
  if(user && user.isValid){
    res.status(400).send("Ce compte a déja été validé. Si vous ne pouvez pas vous encore vous connecter, vous devez attendre qu'un administrateur vous octroie un rôle.")
  }
  else if(user && !user.isValid){
    await user.updateOne({$set: {isValid: true}}).then(res.status(200).send("Compte validé. Un administrateur va prochainement vous octroyer un rôle. Dès lors, vous serez notifié par mail et vous pourrez ensuite vous connecter."));
  }
  else{
    res.status(404).send("Utilisateur introuvable : validation impossible.");
  }
};

// -----------------------------------------------------------------------
//Inscription sur le site
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
    //Envoi de l'email de confirmation une fois que l'inscription est terminée
    console.log("J'envoie le mail")
    confirmEmail(pseudo, email, uniqueString);
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }

};

// ------------------------------------------------------------------------------------
//Identification sur le site à l'aide des identifiants (logique)
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    // const emailInsered = await UserModel.findOne(email);
    const user = await UserModel.login(email, password);
    if(user.role == "" || user.isDisabled) throw err
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
//Envoi de mail avec le nouveau mot de passe généré aléatoirement en cas d'oubli de mot de passe
module.exports.forgottenPassword = async (req, res) => {
  console.log("J'entre dans forgottenPassword !")
  let email = req.body.email;
  resetPass = randomResetString();
  const user = await UserModel.findOne({email: email});
  if(user){
    const salt = await bcrypt.genSalt();
    cryptedPass = await bcrypt.hash(resetPass, salt);
    await UserModel.updateOne({email: email}, {$set: {password: cryptedPass}});
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.MAIL_ADRESS,
          pass: process.env.MAIL_PASS
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
            `
  }
  

    transporter.sendMail(mailOptions, async (err, info) => {
      if(err){
          console.log(err)
      }
      else{
          console.log("Email for password reset has been sent successfully to <" + email + "> !");
          resetPass = "";
          cryptedPass = "";
      }
    })
  }  
  else{
    console.log("User not found");
  } 
}

// ------------------------------------------------------------------------------------