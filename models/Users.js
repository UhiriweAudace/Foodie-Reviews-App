const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
// UserSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({
//         _id: this._id
//     }, config.get("jwtPrivateKey"));
//     return token;
// }
module.exports = User = mongoose.model('users', UserSchema);