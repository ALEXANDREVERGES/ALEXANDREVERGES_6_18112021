const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];// Récupération du token dans le header
        const decodedToken = jwt.verify(token, `${process.env.JWT_RANDOM_TOKEN}`);
        const userId = decodedToken.userId;// on décode le token, la clé doit correspondre à celle utilisée de la function login
        if(req.body.userId && req.body.userId != userId ){//si userId du corps de la requete est différent du userId
            throw 'User ID non valable ! ';
        } else{
            next();//tout est ok on passe au prochain middleware
        }
    } catch(error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }

};
