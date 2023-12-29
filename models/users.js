const { Schema, model } = require('mongoose');
const userSchema = Schema({
    username:String,
    password:String,
    role:String,
    dept:String
})
const User = model("user",userSchema);
module.exports = User;