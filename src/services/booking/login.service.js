const bcrypt = require('bcrypt');
const usermodel = require('../../model/booking/user.model');
const jwt = require('jsonwebtoken'); 
const crypto = require('crypto');
const SECRET_KEY = crypto.randomBytes(64).toString('hex');

const register = async (body) => {
  try {
      const user = new usermodel(body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
     return await user.save();
  } catch (error) {
      console.error(error);
      throw new Error('Registration failed');
  }
}


const login = async (req, body) => { 
  try {
    const { username, password } = body;
    const user = await usermodel.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }
    const userWithoutPassword = { ...user._doc, password: undefined };
    const auth = jwt.sign(userWithoutPassword, 'cnttvietnhatk17');
    return auth;
  } catch (error) {
    console.error(error);
    throw new Error('Login failed');
  }
}

module.exports = {
  login,
  register,
}