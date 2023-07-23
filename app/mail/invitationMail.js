module.exports = (user, password) => ({
  from: 'La Cúpula <lacupulaebjj@gmail.com>',
  to: user.email,
  subject: 'Sending Email using Node.js',
  text: `Hola, tu contraseña es ${password}`,
});
