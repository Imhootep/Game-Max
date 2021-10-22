const mongoose = require("mongoose");
//mongodb+srv://"+ process.env.DB_USER_PASS +"@cluster0.sff55.mongodb.net/mern-project
mongoose
  .connect(
    
    "mongodb://" + process.env.DB_USER_PASS + "@cluster0-shard-00-00.sff55.mongodb.net:27017,cluster0-shard-00-01.sff55.mongodb.net:27017,cluster0-shard-00-02.sff55.mongodb.net:27017/" + process.env.DB_NAME + "?ssl=true&replicaSet=atlas-l2wiet-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));