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

router.get('/allUsers', async ctx => {
  const users = await request.get(`${config.USERS_SERVICE}`);
  ctx.body = users;
});

router.get('/config', async ctx => {
  const urls = [
    `${config.TELEGRAM_SERVICE}/token`,
    `${config.TELEGRAM_SERVICE}/url`,
    `${config.TELEGRAM_SERVICE}/name`
  ];

  const [token, url, name] = await Promise.all(urls.map(request));

  ctx.body = {
    telegram: {
      token,
      url,
      name
    }
  }
});

/**
 * Given a user_id and a platform, send a message using that user's platform id for the specified platform
 * ex. user_id: 123, platform: telegram  =>  send a message to telegram using the users telegram platform id
 */
router.post('/sendMessage', async ctx => {
  const { user_id, platform, message } = ctx.request.body;
  const platform_id = await request.get(`${config.USERS_SERVICE}/${user_id}/${platform}`);
  let service;
  switch(platform) {
    case 'telegram':
      service = config.TELEGRAM_SERVICE
      break;
    default:
      ctx.status = 400;
      ctx.body = `platform ${platform} is invalid`;
      return;
  }
  const json = {
    id: user_id,
    message
  };
  ctx.body = await request.post(`${service}/sendMessage`, { json });
});

router.post('/clean', async ctx => {
  const urls = [
    `${config.MESSAGES_SERVICE}`,
    `${config.USERS_SERVICE}`
  ];

  await Promise.all(urls.map(u => request.del(u)));
  ctx.body = 'All databases cleaned';
});

router.post('/clean/messages', async ctx => {
  await request.del(config.MESSAGES_SERVICE);
  ctx.body = 'Messages database cleaned';
});

router.post('/clean/users', async ctx => {
  await request.del(config.USERS_SERVICE);
  ctx.body = 'Users database cleaned';
});

router.post('/resetTelegramUrl', async ctx => {
  const newUrl = await request.post(`${config.TELEGRAM_SERVICE}/resetUrl`);
  ctx.body = `Telegram URL reset to ${newUrl}`;
});

module.exports = router.routes();