//const db = require('../config/db')
const { signUpErrors, signInErrors } = require('../utils/errors.utils')
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

describe('Tests group for auth.controller.js', function() {

  beforeAll(done => {
    done()
  })

  // -----------------------------------------------------------------------

  test('Test for signUp method', async () => {
    const pseudo = 'testPseudo';
    const email = 'test@email.com';
    const password = 'testPassword';
    const isAdmin = false;
    const isDisabled = false;
    const role = "";
    const uniqueString = "testUniqueString";
    const social = {
      discord: "test",
      twitter: "test",
      youtube: "test",
      facebook: "test",
      instagram: "test",
      twitch: "test",
    };
    try{
      await UserModel.create({pseudo, email, password, role, isAdmin, isDisabled, uniqueString, social});
    }
    catch(err){
      const errors = signUpErrors(err);
    }

    const testUser = await UserModel.findOne(
      { pseudo: 'testPseudo' }
    );
    
    expect(testUser.pseudo).toEqual('testPseudo');
    expect(testUser.email).toEqual('test@email.com');
    expect(testUser.uniqueString).toEqual('testUniqueString');
    //expect(testUser.pasword).toEqual('testPassword') (because password is encrypted)
  });

  // -----------------------------------------------------------------------

  test('Test for validateUser method', async () => {
    const testUser = await UserModel.findOne(
      {uniqueString: 'testUniqueString'}
    );
    if(testUser && !testUser.isValid){
      await UserModel.updateOne({ pseudo: 'testPseudo' },{$set: {isValid: true}});
    };

    const validUser = await UserModel.findOne(
      { pseudo: 'testPseudo' }
    );

    await UserModel.remove(
      { pseudo: 'testPseudo' }
    );
    expect(validUser.isValid).toEqual(true);
  });

  // -----------------------------------------------------------------------



  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully
    mongoose.connection.close()
    done()
  })
})