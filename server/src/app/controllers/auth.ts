import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import fileUpload from 'express-fileupload';
import { Stripe } from 'stripe';
import { createToken } from '../jwt';
import { uploadFile } from '../../Context/Shared/aws';
import config from '../../Context/Shared/infraestructure/config';
import { SequelizeUser } from '../../Context/Users/infraestructure/UserModel';
import { extractFileExtension } from '../../Context/Shared/application/util/strings';

const login = asyncHandler(async (req, res) => {
  const sanitizedEmail = req.body.email.toLowerCase();
  const user = await SequelizeUser.findOne({
    where: {
      email: sanitizedEmail,
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

  const sanitizedEmail = req.body.email.toLowerCase();

  const duplicatedEmailUser = await SequelizeUser.findOne({ where: { email: sanitizedEmail } });
  if (duplicatedEmailUser) {
    res.status(422).send('A user with that email already exists');
    return;
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const stripe = new Stripe(config.stripeKey, { apiVersion: '2023-08-16' });
  const stripeRequest: Stripe.CustomerCreateParams = {
    name: `${req.body.firstName} ${req.body.lastName}`,
    email: req.body.email,
  };
  const stripeCustomer = await stripe.customers.create(stripeRequest);

  const fileExtension = extractFileExtension(image.name);
  const uploadFileName = sanitizedEmail + fileExtension;

  const userData: SequelizeUser = {
    ...req.body,
    email: sanitizedEmail,
    instructor: false,
    password: passwordHash,
    image: `https://lacupula.s3.eu-west-2.amazonaws.com/${uploadFileName}`,
    customerId: stripeCustomer.id,
  };
  const user = await SequelizeUser.create(userData);
  uploadFile(image.data, uploadFileName);
  res.json(user);
});

export { login, signUp };
