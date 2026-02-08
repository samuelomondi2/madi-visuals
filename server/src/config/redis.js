const { createClient } = require('redis');

const isTLS = process.env.REDIS_URL?.startsWith('rediss://');

const client = createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  socket: {
    connectTimeout: 5000,
    ...(isTLS && {
      tls: true,
      rejectUnauthorized: false,
    }),
  },
});

(async () => {
  try {
    await client.connect();
    console.log('🚀 Redis: Connected successfully');
  } catch (err) {
    console.error('❌ Redis: Connection failed', err);
  }
})();

client.on('error', err => {
  console.error('Redis Runtime Error:', err);
});

module.exports = client;
