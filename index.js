const
  Koa = require('koa'),
  app = new Koa(),
  bodyParser = require('koa-bodyparser'),
  config = require('./config')();


app.use(require('./routes'));

app.use(bodyParser());
app.listen(config.PORT);