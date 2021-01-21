// require needed modules
const passport = require('passport')
const Users = require("../models/Users")
const userController = {}

// for app.route("/login")
userController.loginUser = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log("Error: UsersController: loginUser. passport.authenticate: " + err)
            return res.json({ "error": err })
        }
        if (user.message) {
            return res.json({ "error": user.message })
        }
        req.logIn(user, function (err) {
            console.log(`UsersContoller: loginUser. req.logIn user: ${JSON.stringify(user)}`)
            if (err) {
                console.log(`Error: UsersContoller: loginUser. req.logIn err: ${err}`)
                return res.json({ "error": err })
            }
            return res.json(user)
        })
    })(req, res, next)
}

// for app.route("/signUp")
userController.signUp = function (req, res) {
    console.log("register user requested for: " + req.body.username + ", " + req.body.password)
    var newUser = new Users(req.body)

    // first make sure the username do not exist
    Users.find({ $or: [{ username: newUser.username }] }, function (err, user) {

        // report back error if any user found
        if (user && user.length > 0) {

            // check if it was the username that was already taken
            if (user[0].username == newUser.username) {
                console.log("username " + user[0].username + " is already taken")
                return res.json({ "error": "User name is already taken." })
            }
            // catch other errors
            else if (err) {
                console.log("Error: UsersController: signUp. checking if new user already exists:" + err)
                return res.json({ "error": "Oops! Something went wrong... Please try again later." })
            }

        }
        // proceed to save new user
        else {
            console.log("username available")
            newUser.save(async function (err, result) {
                if (err) {
                    console.log("Error: UsersController: signUp. saving new user:" + err)
                    return res.json({ "error": "Oops! Something went wrong... Please try again later." })
                } else {
                    return res.json(result)
                }
            })
        }
    })
}

// for app.route("/getUserByUsername")
userController.getUserByUsername = async function (username) {
    console.log(" from getUserByUsername, username: " + username)

    const user = await Users.find({ "username": username })
    console.log(" from getUserByUsername, user: " + JSON.stringify(user))
    return user

}

// for app.route("/getUserById")
userController.getUserById = async function (id) {
    const user = await Users.findById(id)
    console.log(" from getUserById, user: " + JSON.stringify(user))
    return user
}


// for app.route("/logout")
userController.logoutUser = function (req, res) {
    console.log(" from logoutUser, passport.req.user: " + req.user)
    console.log(" from logoutUser, passport.req.session: " + JSON.stringify(req.session))

    req.logOut()
    res.json({"message": "Logged out successfully"})
}

module.exports = userController