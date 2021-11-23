//*****Instalation express npm install -g express ***********/
//** importer express *****/
const express = require('express');

const morgan = require('morgan');

require('dotenv').config();




//importation de body-parser 
const bodyParser = require('body-parser');

//***npms install --save mongoose */
//importer mongoose pour me connecter a la base de donnée mongoDB
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


// ********** se connecter a la base de donnée mongoDB************************************************************************//
mongoose.connect(
  process.env.SECRET_DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//***application express  ce qui permet de créer applmication express******/
const app = express();
app.use(morgan('dev'));


//gérer les problèmes de CORS (Cross - Origin - Request - Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//transformer le corp (body) en json (objet JS utilisable)
app.use(bodyParser.json());


//************************************************************************************************************************** */
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

//*****exporter application pour qu'on puisse y accéder depuis nos autres fichiers **** */
module.exports = app;