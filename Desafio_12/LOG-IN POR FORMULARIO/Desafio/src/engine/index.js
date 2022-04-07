const path = require('path');
const { engine } = require('express-handlebars');
module.exports = function (app) {
  app.set('view engine', 'hbs');
  app.engine(
    'hbs',
    engine({
      layoutsDir: path.join(__dirname, '../../views/layouts'),
      partialsDir: path.join(__dirname, '../../views/partials'),
      extname: 'hbs',
      defaultLayout: 'index',
    })
  );
};
