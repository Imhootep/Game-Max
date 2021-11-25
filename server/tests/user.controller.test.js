const UserModel = require('../models/user.model')
const mongoose = require("mongoose");
mongoose
  .connect(
    
    "mongodb+srv://mern:test@cluster0.sff55.mongodb.net/mern-test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )

describe('Tests group for user.controller.js', function() {

  beforeAll(done => {
    done()
  })

  // -----------------------------------------------------------------------

  test('test for getRoledUsers method', async () => {
    const testUsers = await UserModel.find({ role: { $ne: "" } }).select("-password");
    var flag = 1;
    for(var i = 0; i < testUsers.length; i++){
      
    }
  })
})