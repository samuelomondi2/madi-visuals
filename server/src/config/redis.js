const { createClient } = require('redis');

const client = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 5000,
    tls: true,
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    await client.connect();
    console.log('🚀 Redis: Connected to Redis Cloud');
  } catch (err) {
    console.error('❌ Redis: Connection failed', err);
  }
})();

client.on('error', err => {
  console.error('Redis Runtime Error:', err);
});

module.exports = client;
