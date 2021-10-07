//const db = require('../config/db')
const { signUpErrors, signInErrors } = require('../utils/errors.utils')
const UserModel = require('../models/user.model')
const controller = require('../controllers/auth.controller')
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

  test('Test for signUp method', async () => {
    const pseudo = 'testPseudo'
    const email = 'test@email.com'
    const password = 'testPassword'
    const isAdmin = false
    const isDisabled = false
    const role = ""
    try{
      //creating test user in database
      const testUserInsert  = await UserModel.create({pseudo, email, password, role, isAdmin, isDisabled})
      //find the test user in database
    }
    catch(err){
      const errors = signUpErrors(err);
    }

    const testUser = await UserModel.findOne(
      { pseudo: 'testPseudo' }
    )
    
    expect(testUser.pseudo).toEqual('testPseudo')
    expect(testUser.email).toEqual('test@email.com')
    //expect(testUser.pasword).toEqual('testPassword') (because password is encrypted)

    await UserModel.remove(
      { pseudo: 'testPseudo' }
    )
    
  })

  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully
    mongoose.connection.close()
    done()
  })
})