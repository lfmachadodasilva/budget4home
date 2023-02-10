import { Redis } from 'ioredis';

const redis =
  process.env.REDIS_ENABLED === 'true'
    ? new Redis(
        `rediss://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
      )
    : null;

export const CacheKeys = {
  labels: (groupId: string) => `${groupId}:labels`
};

export async function getFromCache<T>(
  key: string,
  callback: () => Promise<T>,
  timeToLiveInSeconds: number = 60
): Promise<T> {
  if (process.env.REDIS_ENABLED !== 'true') {
    return await callback();
  }

  const value = await redis.get(key);
  if (value) {
    return JSON.parse(value) as T;
  }

  const data = await callback();
  redis.set(key, JSON.stringify(data), 'EX', timeToLiveInSeconds);

  return data;
}

export async function deleteCache(key: string) {
  if (process.env.REDIS_ENABLED === 'true') {
    return await redis.del(key);
  }
}
