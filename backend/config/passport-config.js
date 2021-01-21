// require needed modules
var Users = require("../models/Users");
const userController = require("../controllers/UsersController");
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await userController.getUserByUsername(username)
            if (user == null || user.length == 0) {
                return done(null, { message: 'No user with that user name' })
            }
            if (await bcrypt.compare(password, user[0].password)) {
                return done(null, user)
            } else {
                return done(null, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => {
        console.log(`serializeUser id: ${user[0].id}`)
        done(null, user[0].id)
    })
    passport.deserializeUser(async (id, done) => {
        console.log(`deserializeUser id: ${id}`)
        const getUserById = await userController.getUserById(id);
        return done(null, getUserById)
    })
}

module.exports = initialize