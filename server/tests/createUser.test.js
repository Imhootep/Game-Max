const { signUp } = require('../controllers/auth.controller')
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

describe('Création d\'un user ', () => {

    it.skip('First user', async (done) => {

        pseudo = "Modeti"
        email = "cammarata@test.com"
        password = "test69"
        const userCreated = await UserModel.create({ pseudo, email, password })
        const user = await UserModel.findById(userCreated._id)

        expect(user.pseudo).toEqual("Modeti")
        expect(user.email).toEqual("cammarata@test.com")
        // expect(user.role).toEqual("Partenaire")
        done()
    })
})