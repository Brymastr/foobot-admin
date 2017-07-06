const Router = require('koa-router');
const router = new Router({
  prefix: '/admin'
});

router.get('/', async ctx => {
  ctx.body = '/admin'
});

router.get('/logs', async ctx => {
  ctx.body = '/admin/logs'
});

router.get('/messages', async ctx => {
  ctx.body = '/admin/messages'
});

router.get('/subscriptions', async ctx => {
  ctx.body = '/admin/messages'
});

router.get('/subscriptions', async ctx => {
  ctx.body = 'summary of subscriptions'
});

module.exports = router.routes();