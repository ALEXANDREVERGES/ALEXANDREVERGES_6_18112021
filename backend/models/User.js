const mongoose = require('mongoose');

//***npm install --save mongoose-unique-validator */
const uniqueValidator = require('mongoose-unique-validator');

//donner un schéma user a la base de donnée mongDB
//model de base pour enregistré un nouvel utilisateur
const userSchema = mongoose.Schema({
    email:{ type: String, required: true, unique: true},
    password : { type: String, required: true},
});
//****permet de ne pas avoir plusieurs utilisateurs avec la même adresse mail */
userSchema.plugin(uniqueValidator);

//exportation du module
module.exports = mongoose.model('User', userSchema);