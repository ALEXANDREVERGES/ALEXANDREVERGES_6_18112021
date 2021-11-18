//*****Instalation express npm install -g express ***********/
//** importer express *****/
const express = require('express');
//***application express  ce qui permet de créer applmication express******/
const app = express();
//***npms install --save mongoose */
const mongoose = require('mongoose');

// ********** se connecter a mongo ************************************************************************//
mongoose.connect('mongodb+srv://bounise1:159Alex13@cluster0.1cpua.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next) => {
    console.log('requête reçue !');
    next();//*******next() permet envoyer la réponse, sinon la requete ne se termine pas */
});
app.use((req, res, next) => {
    res.status(201);
    next();
});
app.use((req, res, next) =>{
    res.json({message: 'Votre requête a bien été reçu!'})
    next();
});
app.use((req, res) => {
    console.log('réponse envoyée avec succès !');
});
//*****exporter application pour qu'on puisse y accéder depuis nos autres fichiers **** */
module.exports = app;