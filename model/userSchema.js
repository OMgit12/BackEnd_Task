const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    gender: String,
    DOB: Date
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;