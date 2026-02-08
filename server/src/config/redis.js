import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redis = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 5000,
    tls: true,              // required for Redis Labs TLS
    rejectUnauthorized: false, // safe for Render / staging
  },
});

redis.on('error', (err) => console.error('Redis Runtime Error:', err));

(async () => {
  try {
    await redis.connect();
    console.log('🚀 Redis: Connected successfully');
  } catch (err) {
    console.error('❌ Redis: Connection failed', err);
  }
})();

export default redis;
