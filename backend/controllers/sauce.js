const sauce = require('../models/sauce');




exports.createSauce = (req, res, next) => {
    const newSauce = new sauce({
      userId: req.body.userId,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      imageUrl: req.body.imageUrl,
      heat: req.body.heat,
      likes: req.body.likes,
      dislikes: req.body.displikes,
      usersLiked: req.body.userLiked,
      usersDisliked: req.body.usersDisliked,
    });
    newSauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  };
exports.modifySauce = (req, res, next) => {
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  };
exports.deleteSauce = (req, res, next) => {
    sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
      .catch(error => res.status(400).json({ error }));
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
