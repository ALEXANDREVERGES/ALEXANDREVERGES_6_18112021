const sauce = require('../models/sauce');
//package fs de node, il nous donne accès aux fonctions qui nous permettent de modifier le système des fichiers
const fs = require('fs');


exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const newSauce = new sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
    newSauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  };
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  };
  exports.deleteSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
exports.getAllSauces = (req, res, next) => {
    sauce.find()
      .then(newSauce => res.status(200).json(newSauce))
      .catch(error => res.status(400).json({ error }));
  };
exports.getOneSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
      .then(newSauce => res.status(200).json(newSauce))
      .catch(error => res.status(404).json({ error }));
  };    

  // 3 conditions possible car voici ce qu'on reçoit du frontend, la valeur du like est soit: 0, 1 ou -1 (req.body.like) 
exports.likesSauces = (req, res, next) => {
// la doc nous dit usersLiked =[string]
  // Like présent dans le body
    let like = req.body.like
      // On prend le userID
    let userId = req.body.userId
    // On prend l'id de la sauce
    let sauceId = req.params.id
    switch (like) { //L'instruction switch évalue une expression et, selon le résultat obtenu et le cas associé, exécute les instructions correspondantes.
        case 1 :   //cas: req.body.like = 1
            sauce.updateOne(
            { _id: sauceId },  // on recherche la sauce avec le _id
            { $push: { usersLiked: userId }, // on ajoute l'utilisateur dans le array usersLiked.
             $inc: { likes: +1 }})           // incrémentaton de la valeur de likes par 1 (+1).
            .then(() => res.status(200).json({ message: "Vous avez mis un like sur la sauce." }))
            .catch((error) => res.status(400).json({ error })) //code 400: bad request
        break; //L'instruction break permet de terminer la boucle en cours ou l'instruction switch ou label en cours 
               //et de passer le contrôle du programme à l'instruction suivant l'instruction terminée.
        case 0 :    //cas: req.body.like = 0
            sauce.findOne({ _id: sauceId }) 
            .then((sauce) => {
                if(sauce.usersLiked.includes(userId)) { // on cherche si l'utilisateur est déjà dans le tableau usersLiked
                    sauce.updateOne(                     
                    { _id: sauceId }, // on recherche la sauce avec le _id
                    { $push: { usersLiked: userId }, // on ajoute l'utilisateur dans le array usersLiked
                     $inc: { likes: -1 }}) // on décremente de 1 (-1) au like.
                    .then(() => res.status(200).json({ message: "Votre like a été supprimé" }))
                    .catch((error) => res.status(400).json({ error }))
                }
            
                if(sauce.usersDisliked.includes(userId)) { // on cherche si l'utilisateur est déjà dans le tableau usersDisliked
                    sauce.updateOne(
                    { _id: sauceId }, // on recherche la sauce avec le _id
                    { $push: { usersDisliked: userId },  // on ajoute l'utilisateur dans le array usersDisliked
                    $inc: { dislikes: -1 }}) //on ajoute -1 au dislike
                    .then(() => res.status(200).json({ message: "Votre dislike a été supprimé" }))
                    .catch((error) => res.status(400).json({ error }))
                }
            })
            .catch((error) => res.status(400).json({ error }))
        break;
        case -1 :
            sauce.updateOne(
            { _id: sauceId }, // on recherche la sauce avec le _id présent dans la requête
            { $push: { usersDisliked: userId }, // on ajoute l'utilisateur dans le array usersDisliked
             $inc: { dislikes: +1 }}) //on ajoute +1 au dislike
            .then(() => res.status(200).json({ message: "Vous avez mis un dislike sur la sauce." }))
            .catch((error) => res.status(400).json({ error }))
        break;
    }
};