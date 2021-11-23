const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.post('/', sauceCtrl.createSauce); 
router.use('/', sauceCtrl.getAllSauces); 
router.get('/:id', sauceCtrl.getOneSauce);
router.put('/:id', sauceCtrl.modifySauce);  
router.delete('/:id', sauceCtrl.deleteSauce);
  
module.exports = router;