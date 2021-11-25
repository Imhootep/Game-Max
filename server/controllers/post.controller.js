const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
// Affichage des posts
module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};
// Création d'un post ou event sur base des données reçues
module.exports.createPost = async (req, res) => {

  let fileName = Date.now()+"_"+req.body.posterId; // nom du fichier au format : "date" _ "id du posteur" pour les différencier et ne jamais avoir deux les mêmes
  let entiereFileName = "";
  if(req.file !== null) entiereFileName = fileName+req.file.detectedFileExtension;   
  
  if (req.file !== null) {
    try {
      if (// erreur si l'extension n'est pas parmis jpg/png/jpeg
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");
      //limitation sur la taille : 500 ko
      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }

    try { // insertion de l'image dans le dossier uploads/posts
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `uploads/posts/${entiereFileName}`
      ) 
    );
      } catch (err){
        console.log(err)
      }
  }

  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "uploads/posts/" + entiereFileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
    isEvent: req.body.isEvent,
    date: req.body.date,
    eventType: req.body.eventType,
    title:req.body.title
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Mise a jour du message d'un post sur base de son id
module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
    title: req.body.title
    
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

// SUppression d'un post sur base de son id 
module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    PostModel.findByIdAndRemove(req.params.id, async (err, docs) => { // suppression du post
    if (!err) {
      if(docs.picture !== ''){
      fs.unlinkSync( // Suppression de l'image stockée si il y en a une 
        `${docs.picture}`
        ) 
      }
      const users = await UserModel.find();
      for(let i = 0; i < users.length; i++){ // on boucle sur tous les utilisateurs
        for(let j = 0; j < users[i].likes.length; j++){ // on boucle sur tous les likes de l'utilisateur en question
          if(users[i].likes[j] === req.params.id){ // on vérifie si cet utilisateur a "liké" le post supprimé 
            users[i].likes.splice(j, 1); // on enlève le like à l'utilisateur
            await UserModel.updateOne({ _id: users[i]._id }, { $set: { likes: users[i].likes } });  // on met à jour en db sa liste de like (sans le post supprimé)    
          }
        }
      }
      res.send(docs);
    }
    else console.log("Delete error : " + err);
  });
};

// Like d'un post sur base de l'id du post
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id }, // on ajoute au post l'id de la personne qui a like
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate( 
      req.body.id,
      {
        $addToSet: { likes: req.params.id }, // on ajoute à l'utilisateur l'id du post qui a été like
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Suppression d'un like d'un post sur base de l'id du post
module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id }, // on enlève l'id de l'utilisateur qui avait liké (dans le post)
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id }, // on enlève l'id du post dans les likes de l'utilisateur
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Ajout d'un commentaire sur un post  
module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate( // ajout d'une array "commentaire" dans le post avec l'id et le pseudo du user qui commente, le texte et la date précise de l'envoi du commentaire
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await PostModel.findOneAndUpdate(
      { _id: req.params.id , comments: {$elemMatch: {_id: req.body.commentId}}},
      { $set: {'comments.$.text': req.body.text, 'comments.$.commenterId': req.body.commenterId, 'comments.$.commenterPseudo': req.body.commenterPseudo, 'comments.$.timestamp': new Date().getTime()}},
      { "new": true }
      );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.findPostByWord = async (req, res) => {
  
  console.log("req : ", req.body)
  console.log("wordToFind : ", req.body.wordToFind)
  try{
    let posts = await PostModel.find({ $or : [ { message: { $regex: '.*' + req.body.wordToFind + '.*', $options : 'i' } }, { title: { $regex: '.*' + req.body.wordToFind + '.*', $options : 'i' } } ]}).sort({ createdAt : -1 }).exec();
    res.status(200).send(posts);
  } catch(err) {
    res.status(400).send(err)
  }
};

module.exports.findPostByType = async (req, res) => {
  console.log("req : ", req.body);
  console.log("wordToFind : ", req.body.wordToFind);

  try{
    let user = await UserModel.find({pseudo: req.body.wordToFind});
    if(user){
      console.log(user);
    }
    else{
      console.log("Je n'ai pas trouvé de user")
    }
    let idUser = user._id;
    let posts = await PostModel.find({ $or : [ { message: { $regex: '.*' + req.body.wordToFind + '.*', $options : 'i' } }, 
        { title: { $regex: '.*' + req.body.wordToFind + '.*', $options : 'i' } },
        { posterId: { $regex: '.*' + user._id + '.*', $options : 'i' } },  
        { eventType: { $regex: '.*' + req.body.wordToFind + '.*', $options : 'i' } }]})
        .sort({ createdAt : -1 }).exec();
    res.status(200).send(posts);
    console.log(user._id);
  } catch(err) {
    res.status(400).send(err)
  }
};
