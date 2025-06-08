import crypto from 'crypto';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import { Resend } from 'resend';
import { SequelizeUser } from '../../Context/Users/infraestructure/UserModel';
import config from '../../Context/Shared/infraestructure/config';

const resend = new Resend('');

const requestPasswordReset = asyncHandler(async (req, res) => {
  const sanitizedEmail = req.body.email.toLowerCase();
  const user = await SequelizeUser.findOne({ where: { email: sanitizedEmail } });
  if (!user) {
    res.status(204).send();
    return;
  }
  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  const resetUrl = `${config.domain}/reset-password?token=${token}`;
  await resend.emails.send({
    from: 'no-reply@lacupula.com',
    to: [user.email],
    subject: 'Restablecer contraseña',
    html: `<p>Haz click en <a href="${resetUrl}">este enlace</a> para restablecer tu contraseña.</p>`,
  });

  res.status(204).send();
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body as { token: string; password: string };
  const user = await SequelizeUser.findOne({ where: { resetPasswordToken: token } });
  if (!user || !user.resetPasswordTokenExpiresAt || user.resetPasswordTokenExpiresAt < new Date()) {
    res.status(400).json('Invalid or expired token');
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  user.password = passwordHash;
  user.resetPasswordToken = null;
  user.resetPasswordTokenExpiresAt = null;
  await user.save();
  res.status(200).json('ok');
});

export { requestPasswordReset, resetPassword };
