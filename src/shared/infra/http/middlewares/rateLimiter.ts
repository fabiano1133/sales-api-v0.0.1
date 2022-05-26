import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

export default async function rateLimiter(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const redisCache = new RedisCache();

        const redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASS,
        });

        const limiter = new RateLimiterRedis({
            storeClient: redisClient,
            keyPrefix: 'ratelimit',
            points: 1, //numero de requisicoes por segundo para um ip
            duration: 1,
        });

        const ip = await limiter.consume(req.ip);

        await redisCache.save('ratelimit', ip);

        return next();
    } catch (error) {
        throw new AppError('Too many request', 429);
    }
}
