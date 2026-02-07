const { createClient } = require('redis');

const client = createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  socket: { connectTimeout: 5000 }
});

// Use an async IIFE or just handle the promise
client.connect()
  .then(() => console.log('🚀 Redis: Connected successfully'))
  .catch(err => console.error('❌ Redis: Connection failed', err));

client.on('error', err => {
  // This handles errors after the initial connection
  console.error('Redis Runtime Error:', err);
});

module.exports = client;

  