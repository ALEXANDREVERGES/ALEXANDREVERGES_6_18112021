const sauce = require('../models/sauce');
//package fs de node, il nous donne accès aux fonctions qui nous permettent de modifier le système des fichiers
const fs = require('fs');


exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const newSauce = new sauce({
    ...sauceObject,
    // On modifie l'URL de l'image, on veut l'URL complète, quelque chose dynamique avec les segments de l'URL
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
exports.likesSauces = (req, res, next) => {
    let like = req.body.like
    let userId = req.body.userId
    let sauceId = req.params.id

    switch (like) {

        case 1 :
            sauce.updateOne(
            { _id: sauceId },
            { $push: { usersLiked: userId }, $inc: { likes: +1 }})
            .then(() => res.status(200).json({ message: "Vous avez mis un like sur la sauce." }))
            .catch((error) => res.status(400).json({ error }))
        break;

        case 0 :
            sauce.findOne({ _id: sauceId }) 
            .then((sauce) => {
                if(sauce.usersLiked.includes(userId)) {
                    sauce.updateOne(
                    { _id: sauceId },
                    { $push: { usersLiked: userId }, $inc: { likes: -1 }})
                    .then(() => res.status(200).json({ message: "Votre like a été supprimé" }))
                    .catch((error) => res.status(400).json({ error }))
                }

                if(sauce.usersDisliked.includes(userId)) {
                    sauce.updateOne(
                    { _id: sauceId },
                    { $push: { usersLiked: userId }, $inc: { dislikes: -1 }})
                    .then(() => res.status(200).json({ message: "Votre dislike a été supprimé" }))
                    .catch((error) => res.status(400).json({ error }))
                }
            })
            .catch((error) => res.status(400).json({ error }))
        break;

        case -1 :
            sauce.updateOne(
            { _id: sauceId },
            { $push: { usersLiked: userId }, $inc: { dislikes: +1 }})
            .then(() => res.status(200).json({ message: "Vous avez mis un dislike sur la sauce." }))
            .catch((error) => res.status(400).json({ error }))
        break;
    }
};