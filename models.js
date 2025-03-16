const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/') 
const userSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
let user=mongoose.model('User', userSchema);
module.exports = user

