const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    first_name: String,
    last_name: String,
    username: String,
    mobile: Number,
    job: String,
    password: String
});
const users = mongoose.model('users', userSchema);

module.exports = {
    users
}