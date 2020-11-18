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

const checkAuthenticated = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'Token not sent.',
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  let payload;
  try {
    payload = jwt.decode(token, 'key');
  } catch (e) {
    return res.status(401).json({
      message: 'Invalid token.',
    });
  }

  if (payload.exp <= Math.floor(Date.now() / 1000)) {
    return res.status(401).json({
      message: 'Token has expired.',
    });
  }

  req.user = payload;
  next();
};

module.exports = {
  createToken,
  checkAuthenticated,
};
