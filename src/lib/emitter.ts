import { Emitter } from "@socket.io/redis-emitter";
import { createClient, RedisClientType } from "redis";

let emitter: Emitter;
let redisClient: RedisClientType;

interface RedisOptions {
    url: string;
    socketRetryStrategy?: (times: number) => number | Error;
}

const DEFAULT_OPTIONS: RedisOptions = {
    url: process.env.REDIS_URL || "redis://localhost:6379",
    socketRetryStrategy: (retries: number) => {
        // exponential backoff: after x retries, give up
        const delay = Math.min(retries * 50, 2000);
        return delay;
    }
};

/**
 * Initialize Redis client and Socket.IO Redis Emitter as singletons.
 * Handles reconnect, errors, and exposes emitter for future use cases.
 */
export async function getEmitter(options: Partial<RedisOptions> = {}): Promise<Emitter> {
    if (emitter) {
        return emitter; // reuse existing
    }

    const { url, socketRetryStrategy } = { ...DEFAULT_OPTIONS, ...options };

    redisClient = createClient({
        url,
        socket: { reconnectStrategy: socketRetryStrategy }
    });

    // attach error handlers for resilience
    redisClient.on("error", (err) => {
        console.error("Redis client error ", err);
    });
    redisClient.on("connect", () => {
        console.log("Redis client connected");
    });
    redisClient.on("reconnecting", () => {
        console.log("Redis reconnecting...");
    });

    await redisClient.connect();

    emitter = new Emitter(redisClient);

    return emitter;
}

/**
 * Gracefully close Redis connection and emitter.
 */
export async function closeEmitter() {
    if (emitter) {
        try {
            await redisClient.quit();
            console.log("*meow* Redis connection closed gracefully");
        } catch (err) {
            console.error("*hiss* Error closing Redis:", err);
        }
    }
}