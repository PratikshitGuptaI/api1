const sequelize = require('../config/db');
const UserRepo = require('../repo/user-repo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userrepo = new UserRepo();
const User = sequelize.User;
class UserController {
  async getUserRole(req,res){
    try{
      const role = await userrepo.getUserRole(req.params.userId);
      if (!role) {
        return res.status(200).json({ result: 'No Users Found' });
      }
      else {
        return res.status(200).json({ result: role });
      }
    }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getAllUsers(req, res) {
    try {
      const list = await userrepo.getAllUsers();
      if (!list) {
        return res.status(200).json({ result: 'No Users Found' });
      }
      else {
        return res.status(200).json({ result: list });
      }
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      // res.status(400).json({ message: error.message });
    }
  }
  async getUserById(req, res) {
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    const userId = req.body.userid;
    const user = await userrepo.getUserById(userId);
    return res.status(200).json(user);
  }
  async createUser(req, res) {
    const user = await userrepo.createUser(req);
    return res.status(200).json(user);
  }
  async userLogin(req, res) {
    try {
      const userid = req.body.userid;
      const password = req.body.password;
      // const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          [Op.and]:
            [
              { userid: userid },
              { password: password }
            ]
        }
      });
      if (!!!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // const passwordMatch = await bcrypt.compare(password, user.password);
      if (!user.password) {
        console.log(passwordMatch);
        console.log(password);
        console.log(user.password);
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
      console.log(token);
      setTimeout(() => {
        try {
          var decoded = jwt.verify(token, 'your_secret_key');
          console.log(decoded)
        } catch (err) {
          console.log('error', err)
        }
      }, 2000);
      // const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
      // console.log(
      //   updateToken(token,user.id) 
      // );
      const updateUser = User.update({
        last_session: token
      }, {
        where: {
          id: user.id
        },
      });
      res.json({ message: 'Login Successful', token, updateUser,user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async getRoutes(req, res) {
    const list = await userrepo.getAllRoutes();
    // [1,2,3];
    return res.status(200).json(list);
  }
  async getUserRoutes(req, res) {
    const userid = req.params.userId;
    const list = await userrepo.getUserRoutes(userid);
    // [1,2,3];
    return res.status(200).json(list);
  }
  async updateUser(req,res){
    try{
      const user = await userrepo.updateUser(req);
      return res.status(200).json({result:user});
    }catch(error){
      res.status(400).json({ message: error.message });
    }
  }
  async deleteUser(req,res){
    try{
      const userId = req.params.userId;
      const user = await userrepo.deleteUser(userId);
      console.log(user);
      if (!user) {
        return res.status(200).json({ result: 'No User Found' });
      }
      else {
        return res.status(200).json({ result: user });
      }

    }catch(error){
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }


}

module.exports = UserController