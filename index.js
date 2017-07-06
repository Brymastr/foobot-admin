const
  Koa = require('koa'),
  app = new Koa(),
  bodyParser = require('koa-bodyparser');

const PORT = 3001;

app.use(require('./routes'));

app.use(bodyParser());
app.listen(PORT);