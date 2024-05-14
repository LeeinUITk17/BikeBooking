const jwt = require('jsonwebtoken');

const generateToken = (userId, username, productIds) => {
  const secretKey = 'cnttvietnhatk17';

  const payload = {
    userId,
    username,
    productIds
  };
  const expirationTime = Math.floor(Date.now() / 1000) + 7200;

  const options = {
    expiresIn: expirationTime
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

const verifyToken = (token) => {
    const secretKey = 'cnttvietnhatk17';
  
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      console.error('JWT Verification Error:', error);
      return null;
    }
};


module.exports = {
  generateToken,
  verifyToken,
 
};
