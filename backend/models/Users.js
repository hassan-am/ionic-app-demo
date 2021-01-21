// require needed modules
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema

// schema
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

// pre hook for encrypting password during user creation or password modification using bcrypt module
userSchema.pre('save', async function (next) {
    console.log("pre save: " + this.username + ", " + this.password)
    var user = this
    var SALT_FACTOR = 10

    try {
        const hashedPassword = await bcrypt.hash(user.password, SALT_FACTOR)
        user.password = hashedPassword
        next()
    } 
    catch (err) {
        return next(err)
    }
})

// custom bcrypt function to compare password between candidatePassword and this (existing stored pw)
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

// create model from schema
var Users = mongoose.model('Users', userSchema)

// export module to make it available in other scripts
module.exports = Users

