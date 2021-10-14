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
    jest.setTimeout(10000) //Adding 10 seconds timeout
    const pseudo = 'testPseudo'
    const email = 'test@email.com'
    const password = 'testPassword'
    const isAdmin = false
    const isDisabled = false
    const role = ""
    try{
      //creating testUser in database
      const testUserInsert  = await UserModel.create({pseudo, email, password, role, isAdmin, isDisabled})
    }
    catch(err){
      const errors = signUpErrors(err);
    }
    //find the testUser in database
    const testUser = await UserModel.findOne(
      { pseudo: 'testPseudo' }
    )
    
    expect(testUser.pseudo).toEqual('testPseudo')
    expect(testUser.email).toEqual('test@email.com')
    //expect(testUser.pasword).toEqual('testPassword') (because password is encrypted)

    //delete the testUser from the database
    await UserModel.deleteOne(
      { pseudo: 'testPseudo' }
    )
    
  })

  ///////////////////////////////////////////////////////////////////////

  test.skip('test for sign in method', async () => {
    const pseudo = 'testPseudo'
    const email = 'test@email.com'
    const password = 'testPassword'
    const isAdmin = false
    const isDisabled = false
    const role = "expert"
    try{
      //creating testUser in database
      const testUserInsert  = await UserModel.create({pseudo, email, password, role, isAdmin, isDisabled})
      //Attempting to login testUser
      const testUserLogin = await UserModel.login(email, password)
    }
    catch(err){
      const errors = signUpErrors(err);
    }
    const res = await request(app).set('Authorization', 'testUser').get('/users')
    expect(res.status).toBe(200)

    //delete the testUser from the database
    await UserModel.deleteOne(
      { pseudo: 'testPseudo' }
    )
  })

  

  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully
    mongoose.connection.close()
    done()
  })
})