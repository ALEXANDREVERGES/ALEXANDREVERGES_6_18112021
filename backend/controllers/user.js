//***npm install --save bcrypt */
const bcrypt = require('bcrypt');
//**npm install --save jsonwebtoken */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
//importation de crypto pour chiffrer le mail npm install --save crypto-js
const cryptojs = require('crypto-js');

//importation pour utiliser les variables d'environnements (fichier .env)
const dotenv = require('dotenv');
require('dotenv').config();


//***function signup qui va crypté le password (brcrypt.hash) */
//***cette function va crypter le  password et  créer un nouveau utilisateur (user)*/
/**en prenant le password crypté + email  et l'enregistré ---> save()*/
exports.signup = (req, res, next) => {
  //chiffrer Email avant de l'envoyer dans la base de donnée
const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User ({
            email: emailCryptoJs ,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message : 'Utilisateur créé !!'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};



//******On recupère un user de la base de données, si user introuvable return (401) */
//*****On compare le mot de passe entré avec le hash (bcrypt.compare), si la comparaison n'est pas bonne (401)*/
//*****Sinon si la comparaison est bonne, utilisateur a rentré des bonnes informations et on renvoie un userID et token  */
exports.login = (req, res, next) => {
  const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    User.findOne({ email: emailCryptoJs })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            //*****utilisation .sign pour encoder un nouveau token */
            token: jwt.sign(
              { userId: user._id },
              process.env.JWT_RANDOM_TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};