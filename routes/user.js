const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db.js');
const Sequelize = require('sequelize');
const User = require('../models/user.js')
// (sequelize, Sequelize.DataTypes,
//   Sequelize.Model);
const UserController = require('../controllers/userController.js')
const userController = new UserController();
const authenticate = require('../middleware/auth.js');
const { sendEmail } = require('../middleware/emailUtils.js');

router.get('/list' ,userController.getAllUsers );
router.post('/login', userController.userLogin );
router.get('/role/:userId',userController.getUserRole)
// async (req, res) => {
//   try {
//     const { userid,username, password, role,email,number,firstName } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create(req.body);
//     res.status(201).json({ user });
//     const emailSubject = 'Signup Notification';
//     const emailText = `Hello ${username},\nYou have successfully Created Your Account.`;
//     await sendEmail(email, emailSubject, emailText);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }
router.get('/routes/:userId',userController.getUserRoutes);
router.get('/routes',userController.getRoutes);
router.get('/generateRandomData', (req, res) => {
  const randomSixDigitNumber = generateRandomNumber(100000, 999999);
  const randomAlphabet = generateRandomAlphabet();
  
  const result = 
  randomAlphabet+randomSixDigitNumber
  // {
    // number: randomSixDigitNumber,
  // alphabet: randomAlphabet,
  // };

  res.json(result);
});

router.get('/',userController.getUserById);
router.put('/:userId',userController.updateUser)
router.delete('/:userId',userController.deleteUser);
router.post('/',userController.createUser);
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomAlphabet() {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomIndex = Math.floor(Math.random() * alphabets.length);
  return alphabets.charAt(randomIndex);
}


module.exports = router;