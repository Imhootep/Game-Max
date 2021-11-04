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

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
    
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

module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);


    const users = await UserModel.find();
    for(let i = 0; i < users.length; i++){
      for(let j = 0; j < users[i].likes.length; j++){
        if(users[i].likes[j] === req.params.id){
          users[i].likes.splice(j, 1);
          await UserModel.updateOne({ _id: users[i]._id }, { $set: { likes: users[i].likes } });      
        }
      }
    }

    PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) {
    if(docs.picture !== ''){
    fs.unlinkSync(
      `${docs.picture}`
      ) 
    }
    res.send(docs);
    }
    else console.log("Delete error : " + err);
  });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
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

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
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

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
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

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
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

  try{
    let posts = await PostModel.find({ $or : [ { message: { $regex: '.*' + req.body.search + '.*', $options : 'i' } }, { title: { $regex: '.*' + req.body.search + '.*', $options : 'i' } } ]}).sort({ createdAt : 1 }).exec();
    res.status(200).send(posts);
  } catch(err) {
    res.status(400).send(err)
  }
};

module.exports.findPostByType = async (req, res) => {

  try{
    console.log(req.body.eventType)
    let posts = await PostModel.find({ eventType : req.body.eventType }).sort({ createdAt : 1 }).exec();
    res.status(200).send(posts);
  } catch(err) {
    res.status(400).send(err)
  }
};
