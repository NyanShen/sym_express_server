const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    fullName: String,
    password: String
})
const User = mongoose.model('user', userSchema);

// const newUser = new User({username: "NyanShen", fullName: "admin Nyan", password: "admin"});
// newUser.save()

module.exports = User;