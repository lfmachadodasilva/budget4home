import { Redis } from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

export const CacheKeys = {
  labels: (groupId: string) => `${groupId}:labels`
};

export async function getFromCache<T>(
  key: string,
  callback: () => Promise<T>,
  timeToLiveInSeconds: number = 60
): Promise<T> {
  const value = await redis.get(key);
  if (value) {
    console.log('value exist', value);
    return JSON.parse(value) as T;
  }

  console.log('value does not exist - cache again');
  const data = await callback();
  redis.set(key, JSON.stringify(data), 'EX', timeToLiveInSeconds);

  return data;
}

export async function deleteCache(key: string) {
  return await redis.del(key);
}
