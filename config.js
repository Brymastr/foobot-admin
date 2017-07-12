module.exports = () => {
  const env = process.env;
  return config = {
    PORT: env.PORT || 3001,
    TELEGRAM_SERVICE: env.TELEGRAM_SERVICE || 'http://localhost:3101',
    MESSAGES_SERVICE: env.MESSAGES_SERVICE || 'http://localhost:3002',
    USERS_SERVICE: env.USERS_SERVICE || 'http://localhost:3003',
  }
};

