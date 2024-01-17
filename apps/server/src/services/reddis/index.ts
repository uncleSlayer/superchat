import Reddis from 'ioredis'

export const redis = new Reddis({
    host: 'unclessupermem-otasiddhant-d9a3.a.aivencloud.com',
    port: 23560,
    password: 'AVNS_2yIPR0bPCLuPXdJo1fa',
    username: 'default'
})

redis.on('error', (err) => console.log('Redis Error', err));
