const mongoose = require('mongoose')

//donner un schéma sauce a la base de donnée mongDB
//model de base pour enregistré une nouvelle sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true},
  description: { type: String, required: true },
  mainPepper: { type: String, required: true},
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true},
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true},
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true},
})

//exportation du module
module.exports = mongoose.model('Sauce', sauceSchema);