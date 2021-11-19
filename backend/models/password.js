const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(10)              // Longueur minimale 10                     
.is().max(60)              // Longueur maximale 60                  
.has().uppercase()         // Doit contenir des lettres majuscules                     
.has().lowercase()         // Doit contenir des lettres minuscules                   
.has().digits(4)           // Doit avoir au moins 4 chiffres                    
.has().not().spaces()      // Ne devrait pas avoir d'espaces              

//exportation du module
module.exports = passwordSchema;