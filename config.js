module.exports = () => {
  const env = process.env;
  return config = {
    PORT: 3001,
    TELEGRAM_SERVICE: env.telegram_service || 'http://localhost:3101',
    MESSAGES_SERVICE: env.messages_service || 'http://localhost:3002'
  }
};

