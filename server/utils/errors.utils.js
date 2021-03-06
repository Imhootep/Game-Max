module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { message : ''}

  if ((err.message.includes("email")) || (err.message.includes('password')))
    errors.message = "Email ou mot de passe incorrect."

  if (err.message.includes('err'))
    errors.message = "Compte en attente d'acceptation/revalidation."

  return errors;
}

module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: ""};

  if (err.message.includes('invalid file'))
    errors.format = "Format incompatabile";

  if (err.message.includes('max size'))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors
}

module.exports.changePasswordErrors = (err) => {
  let errors = {message: ''};

  if(err.message.includes("passwords have no match")){
    errors.message = "Les mots de passe ne correspondent pas";
  }

  if(err.message.includes("incorrect old password")){
    errors.message = "Le mot de passe actuel est incorrect";
  }

  if(err.message.includes("user not found")){
    errors.message = "Aucun user trouvé";
  }

  return errors;
}