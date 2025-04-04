import Reddis, { Redis } from 'ioredis'

import dotenv from 'dotenv'

dotenv.config()

export const redisPub = new Reddis(`rediss://default:${process.env.REDIS_TOKEN}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`)

export const redisSub = new Redis(`rediss://default:${process.env.REDIS_TOKEN}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`)

redisPub.on('error', (err) => console.log('Redis PUB Error', err));
redisSub.on('error', (err) => console.log('Redis SUB Error', err))
