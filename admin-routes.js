const
  request = require('request-promise-native'),
  Router = require('koa-router'),
  router = new Router({ prefix: '/admin'}),
  config = require('./config')();

router.get('/', async ctx => {
  ctx.body = '/admin'
});

router.get('/logs', async ctx => {
  ctx.body = '/admin/logs'
});

router.get('/userMessages/:user_id', async ctx => {
  const messages = await request.get(`${config.MESSAGES_SERVICE}/user/${ctx.params.user_id}`);
  ctx.body = messages;
});

router.get('/conversationMessages/:converstion_id', async ctx => {
  const messages = await request.get(`${config.MESSAGES_SERVICE}/conversation/${ctx.params.converstion_id}`);
  ctx.body = messages;
});

router.get('/subscriptions', async ctx => {
  ctx.body = 'summary of subscriptions'
});

router.get('/config', async ctx => {
  const token = await request.get(`${config.TELEGRAM_SERVICE}/token`);

  ctx.body = {
    telegram: {
      token
    }
  }
});

module.exports = router.routes();