module.exports = (user, password) => ({
  from: 'La Cúpula <lacupulaebjj@gmail.com>',
  to: user.email,
  subject: 'Invitación a La Cúpula App',
  text: `Para iniciar sesión por primera vez, tu contraseña será ${password}. Se recomienda modificarla posteriormente.`,
});
