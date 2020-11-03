const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const payload = {
    sub: user.id,
    name: user.name,
    iat: Date.now(),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  };
  return jwt.sign(payload, 'key');
};

module.exports = {
  createToken,
};
