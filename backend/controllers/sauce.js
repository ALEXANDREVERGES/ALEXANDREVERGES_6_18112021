const sauce = require('../models/sauce');
//package fs de node, il nous donne accès aux fonctions qui nous permettent de modifier le système des fichiers
const fs = require('fs');


exports.createSauce = (req, res, next) => {
    const newSauce = new sauce({
      userId: req.body.userId,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      heat: req.body.heat,
      likes: req.body.likes,
      dislikes: req.body.displikes,
      usersLiked: req.body.userLiked,
      usersDisliked: req.body.usersDisliked,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
