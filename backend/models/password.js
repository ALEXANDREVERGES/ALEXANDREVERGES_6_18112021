//npm install --save password-validator
//permet de "paramétrer" le mot de passe
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)              // Longueur minimale 8                     
.is().max(60)              // Longueur maximale 60                  
.has().uppercase()         // Doit contenir des lettres majuscules                     
.has().lowercase()         // Doit contenir des lettres minuscules                   
.has().digits(1)           // Doit avoir au moins 1 chiffre                    
.has().not().spaces()      // Ne devrait pas avoir d'espaces              

//exportation du module
module.exports = passwordSchema;