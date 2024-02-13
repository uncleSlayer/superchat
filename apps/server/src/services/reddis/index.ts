import Reddis, { Redis } from 'ioredis'

export const redisPub = new Reddis({
    host: 'apn1-thorough-minnow-33368.upstash.io',
    port: 33368,
    password: "54e3d256d57a4713b62ab374f1ca3d7f",
})

export const redisSub = new Redis({
    host: 'apn1-thorough-minnow-33368.upstash.io',
    port: 33368,
    password: "54e3d256d57a4713b62ab374f1ca3d7f",
})

redisPub.on('error', (err) => console.log('Redis PUB Error', err));
redisSub.on('error', (err) => console.log('Redis SUB Error', err))
