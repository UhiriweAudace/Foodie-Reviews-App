const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const saucesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    manufacturer: {
        type: String
    },
    description: {
        type: String
    },
    mainPepper: {
        type: String
    },
    imageUrl: {
        type: String
    },
    heat: {
        type: Number
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    usersLiked: [String],
    usersDisLiked: [String]
});

// saucesSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({
//         _id: this._id
//     }, config.get("jwtPrivateKey"));
//     return token;
// }


module.exports = mongoose.model("Sauce", saucesSchema);

/**
 * _id: String— the unique identifier created by MongoDB
 userId: String— the MongoDB unique identifier
 for the user who created the sauce
 name: String— name of the sauce
 manufacturer: String— manufacturer of the sauce
 description: String— description of the sauce
 mainPepper: String— the main pepper ingredient in the sauce
 imageUrl: String— the URL for the picture of the sauce uploaded by the user
 heat: Number— number between 1 and 10 describing the sauce
 likes: Number— number of users liking the sauce
 dislikes: Number— number of users disliking the sauce
 usersLiked: [String]— array of user IDs of users having liked the sauce
 usersDisliked: [String]— array of user IDs of users having disliked the sauce
 */