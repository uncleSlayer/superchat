import Reddis, { Redis } from 'ioredis'

export const redisPub = new Reddis({
})

export const redisSub = new Redis()

redisPub.on('error', (err) => console.log('Redis PUB Error', err));
redisSub.on('error', (err) => console.log('Redis SUB Error', err))
