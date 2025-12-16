// import redis from 'redis';
// const redisClient = redis.createClient();

// client.on("error", (err) => console.error("Redis Error:", err));
// client.on("connect", () => console.log("Connected to Redis"));

// client.connect();

// export default redisClient;


import { createClient } from 'redis';

let redisClient = null;

/**
 * Initialize Redis safely (optional)
 */
export async function initRedis() {
  try {
    // Optional env flag (recommended)
    if (process.env.USE_REDIS === 'false') {
      console.warn('Redis disabled via USE_REDIS=false');
      return null;
    }

    const client = createClient({
      url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
    });

    client.on('error', (err) => {
      console.warn('Redis error, continuing without cache:', err.message);
      redisClient = null;
    });

    client.on('connect', () => {
      console.log('✅ Connected to Redis');
    });

    await client.connect();
    redisClient = client;
  } catch (err) {
    console.warn('⚠️ Redis not available, skipping cache');
    redisClient = null;
  }

  return redisClient;
}

/**
 * Get Redis client (may be null)
 */
export function getRedisClient() {
  return redisClient;
}
