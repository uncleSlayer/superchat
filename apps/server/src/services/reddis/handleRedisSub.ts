import { redisSub } from '../reddis/index'
import { socketService } from '../../index'

export const subscribe = async () => {

  await redisSub.subscribe('ib', (err, count) => {
    if (err) console.log(`Error while subscribing to ${'ib'}. Error: `, err)
  })

  redisSub.on('message', (ib, message) => {
    const messageObj: { to: string, from: string, message: string, time: number } = JSON.parse(message)

    socketService.replyIb(messageObj.to, messageObj.from, messageObj.message, messageObj.time)
  })

}
