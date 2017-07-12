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

router.get('/allMessages', async ctx => {
  const messages = await request.get(`${config.MESSAGES_SERVICE}`);
  ctx.body = messages;
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
  const urls = [
    `${config.TELEGRAM_SERVICE}/token`,
    `${config.TELEGRAM_SERVICE}/url`
  ];

  const [token, url] = await Promise.all(urls.map(request));

  ctx.body = {
    telegram: {
      token,
      url
    }
  }
});

router.post('/clean', async ctx => {
  const urls = [
    `${config.MESSAGES_SERVICE}`
  ];

  await Promise.all(urls.map(u => request.del(u)));
  ctx.body = 'All dabatases cleaned';
});

router.post('/clean/messages', async ctx => {
  await request.del(config.MESSAGES_SERVICE);
  ctx.body = 'Messages dabatase cleaned';
});

router.post('/clean/users', async ctx => {
  await request.del(config.USERS_SERVICE);
  ctx.body = 'Users dabatase cleaned';
});

module.exports = router.routes();