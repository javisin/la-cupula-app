import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import fileUpload from 'express-fileupload';
import User from '../../database/models/user';
import { createToken } from '../jwt';
import { uploadFile } from '../../Context/Shared/aws';
import config from '../../Context/Shared/infraestructure/config';

const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    const matchPassword = await bcrypt.compare(req.body.password, user.password);
    if (matchPassword || !config.checkPasswords) {
      const token = createToken(user);
      res.status(200).json(token);
      return;
    }
  }
  res.status(401).json('usuario no existente');
});

const signUp = asyncHandler(async (req, res) => {
  const image = req.files?.image as fileUpload.UploadedFile;
  if (!image) {
    res.status(400).send('Missing image file');
    return;
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const userData: User = {
    ...req.body,
    instructor: false,
    password: passwordHash,
    image: `https://lacupula.s3.eu-west-2.amazonaws.com/${image.name}`,
  };
  const user = await User.create(userData);
  uploadFile(image.data, image.name);
  res.json(user);
});

export { login, signUp };
