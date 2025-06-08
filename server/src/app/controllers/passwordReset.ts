import crypto from 'crypto';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import { Resend } from 'resend';
import { SequelizeUser } from '../../Context/Users/infraestructure/UserModel';
import config from '../../Context/Shared/infraestructure/config';

const resend = new Resend(config.resendApiKey);

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
  const emailHtml = `
    <div style="max-width:400px;margin:0 auto;text-align:center;font-family:'Bebas Neue',Arial,sans-serif;">
      <h2 style="color:#000;margin-bottom:16px;">La Cúpula App</h2>
      <p style="color:#000;font-size:16px;margin:0 0 12px;">Has solicitado restablecer tu contraseña.</p>
      <p style="margin:0 0 24px;">Haz clic en el botón para continuar.</p>
      <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background:#000;color:#fff;text-decoration:none;border-radius:4px;">Restablecer contraseña</a>
      <p style="font-size:12px;color:#555;margin-top:24px;">Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
    </div>`;
  await resend.emails.send({
    from: `La Cúpula App <no-reply@ejjblacupula.app>`,
    to: [user.email],
    subject: 'Restablecer contraseña',
    html: emailHtml,
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
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordTokenExpiresAt = null;
  await user.save();
  res.status(200).json('ok');
});

export { requestPasswordReset, resetPassword };
