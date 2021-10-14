const UserModel = require("../models/user.model");
const userController = require('../controllers/user.controller')
const mongoose = require("mongoose");
const { Mongoose } = require("mongoose");


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

  describe('test group for user.controller.js', function() {
    beforeAll(done => {
        jest.setTimeout(10000) //Ajout d'un timeout de 10 secondes 
        done()
      })
    
    test('Test for getting all users method', async () => {
        try{
            //Attempting to get all users
            const testUsers = await userController.getAllUsers()

        }catch(err){
            return err
        }
        expect(testUsers).toBe(!undefined)
    })


    ///////////////////////////////////////////////////////////////////////


    test('test for getting all roled users method', async () => {
        try{
            //Adding 2 roled users and 1 unroled user into the database
            const testRoledUser1 = await UserModel.create({
                pseudo: 'test1Pseudo',
                email: 'test1@email.com',
                password: 'test1Password',
                isAdmin: false,
                isDisabled: false,
                role: 'expert'
            })
            const testRoledUser2 = await UserModel.create({
                pseudo: 'test2Pseudo',
                email: 'test2@email.com',
                password: 'test2Password',
                isAdmin: false,
                isDisabled: false,
                role: 'sponsor'
            })
            const testRoledUser3 = await UserModel.create({
                pseudo: 'test3Pseudo',
                email: 'test3@email.com',
                password: 'test3Password',
                isAdmin: false,
                isDisabled: false,
                role: ''
            })
            //Attempting to get all roled users
            const testRoledUsers = await userController.getRoledUsers()
        }catch(err){
            return err
        }
        const flag = 25
        if(testRoledUsers != undefined && testRoledUsers.length == 2){flag = 1}
        expect(flag).toBe(1)

        //Deleting previously created users from the database
        await UserModel.deleteMany({})
    })

    ///////////////////////////////////////////////////////////////////////

    afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully
        mongoose.connection.close()
        done()
      })
  })