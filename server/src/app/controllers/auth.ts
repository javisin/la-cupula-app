import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import fileUpload from 'express-fileupload';
import { Stripe } from 'stripe';
import { createToken } from '../jwt';
import { uploadFile } from '../../Context/Shared/aws';
import config from '../../Context/Shared/infraestructure/config';
import { UserModel } from '../../Context/Users/infraestructure/UserModel';

const login = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({
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

  const duplicatedEmailUser = await UserModel.findOne({ where: { email: req.body.email } });
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
  const userData: UserModel = {
    ...req.body,
    instructor: false,
    password: passwordHash,
    image: `https://lacupula.s3.eu-west-2.amazonaws.com/${image.name}`,
    customerId: stripeCustomer.id,
  };
  const user = await UserModel.create(userData);
  uploadFile(image.data, image.name);
  res.json(user);
});

export { login, signUp };
