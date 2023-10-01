import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request } from 'express';
import { SequelizeUser } from '../Context/Users/infraestructure/UserModel';

interface AuthJwtPayload extends JwtPayload {
  sub: string;
  instructor: boolean;
  iat: number;
}

export interface AuthorizedRequest extends Request {
  user?: AuthJwtPayload;
}

const createToken = (user: SequelizeUser) => {
  const { JWT_SECRET } = process.env;
  if (JWT_SECRET === undefined) {
    throw new Error('JWT_SECRET is not set');
  }

  const payload: AuthJwtPayload = {
    sub: user.id.toString(),
    instructor: user.instructor,
    iat: Date.now(),
  };
  return jwt.sign(payload, JWT_SECRET);
};

const checkAuthenticated = asyncHandler(async (req: AuthorizedRequest, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      message: 'Token not sent.',
    });
    return;
  }

  const token = req.headers.authorization.split(' ')[1];
  let payload;
  const { JWT_SECRET } = process.env;
  if (JWT_SECRET === undefined) {
    throw new Error('JWT_SECRET is not set');
  }

  try {
    payload = jwt.verify(token, JWT_SECRET) as AuthJwtPayload;
  } catch (e) {
    res.status(401).json({
      message: 'Invalid token.',
    });
    return;
  }

  req.user = payload;
  next();
});

export { createToken, checkAuthenticated };
