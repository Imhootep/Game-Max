const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const { changePasswordErrors } = require("../utils/errors.utils");

// Retourne tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
  let user = "";
  const users = await UserModel.find().select("-password");
  if(res.locals.user == null || res.locals.user == undefined){
    user = null;
  }
  else{
    user = res.locals.user._id
  }
  res.status(200).json({users: users, user: user});
};

// ------------------------------------------------------------------------------------

// Retourne tous les utilisateurs avec un role (n'affiche pas ceux sans rôle, ils sont supposés être en attente d'acceptation)
module.exports.getRoledUsers = async (req, res) => {
  const users = await UserModel.find({ role: { $ne: "" } }).select("-password");
  res.status(200).json(users);
};

// ------------------------------------------------------------------------------------

// Données de l'utilisateur selon l'ID
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

// ------------------------------------------------------------------------------------

// Modification des données de l'utilisateur via le formulaire
module.exports.updateUser = async (req, res) => {
  console.log(req.body)
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pseudo: req.body.pseudo,
          company: req.body.company,
          bio: req.body.bio,
          adresse: req.body.adresse,
          membres: req.body.membres,
          jeux: req.body.jeux,
          social: {
            discord:req.body.social.discord,
            twitter:req.body.social.twitter,
            youtube:req.body.social.youtube,
            facebook:req.body.social.facebook,
            instagram:req.body.social.instagram,
            twitch:req.body.social.twitch,
          }
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// ------------------------------------------------------------------------------------

// Disable : l'utilisateur est désactivé (variable isDisabled à "true")
module.exports.setDisableUserTrue = async (req, res) => {
  console.log(req.body)
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isDisabled: true
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// ------------------------------------------------------------------------------------

// Annulation du disable : l'utilisateur est réactivé (variable isDisabled remise à "false")
module.exports.setDisableUserFalse = async (req, res) => {
  console.log(req.body)
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isDisabled: false
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// ------------------------------------------------------------------------------------

// Modification du role ou de l'adresse d'un utilisateur (par l'admin)
module.exports.updateUserFromAdmin = async (req, res) => {
  console.log(req.body)
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          adresse: req.body.adresse,
          role: req.body.role,
          expert_role: req.body.expert
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// ------------------------------------------------------------------------------------

// Suppression d'un utilisateur, peut être à modifier/enlever
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// ------------------------------------------------------------------------------------

// Méthode de follow d'un utilisateur 
module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// ------------------------------------------------------------------------------------
// Méthode d'unfollow d'un utilisateur
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
    // remove to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// ------------------------------------------------------------------------------------
// Changement de password
module.exports.changePassword = async (req, res) => {
  let ancienPass = req.body.ancienPass;
  let newPass = req.body.newPass;
  let confirmNewPass = req.body.confirmNewPass;
  const user = await UserModel.findById(
    { _id: req.params.id }
  );
  try{
    if(user){
      if(await bcrypt.compare(ancienPass, user.password)){
        console.log("L'ancien mot de passe est correct");
        if(newPass == confirmNewPass){
          console.log("L'ancien mot de passe est : " + ancienPass);
          console.log("Le nouveau mot de passe est : " + newPass);
          const salt = await bcrypt.genSalt();
          newPass = await bcrypt.hash(newPass, salt);
          const updatedUser = await UserModel.updateOne(
            { _id: req.params.id }, { $set: {password: newPass} }
          );
          console.log("Le mot de passe a bien été modifié");
          }
          else{
            throw Error("passwords have no match");
          }
      }
      else{
        throw Error("incorrect old password");
      }
    }
    else{
      throw Error("user not found");
    }
  }catch(err){
    const errors = changePasswordErrors(err);
    res.status(200).json({ errors });
  }
} 

module.exports.favoritesPosts = async (req,res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    
    UserModel.findById(req.params.id, (err, docs) => {
      if (!err) {
      console.log(docs)
      res.send(docs);
      }
      else console.log("ID unknown : " + err);
    }).select("likes");
};
