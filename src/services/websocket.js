import { io } from 'socket.io-client'

class WebSocketService {
  constructor() {
    this.socket = null
    this.connected = false
    this.subscribers = new Map()
  }

  async connect() {
    if (!this.socket) {
      this.socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3000', {
        autoConnect: false,
        transports: ['websocket'],
      })
    }

    this.connected = true
    return { connected: true }
  }

  disconnect() {
    this.connected = false
    this.subscribers.clear()
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  subscribe(channel, callback) {
    const key = `${channel}-${Date.now()}-${Math.random().toString(16).slice(2)}`
    this.subscribers.set(key, { channel, callback })

    return () => {
      this.subscribers.delete(key)
    }
  }

  publishMock(channel, payload) {
    this.subscribers.forEach((subscription) => {
      if (subscription.channel === channel) {
        subscription.callback(payload)
      }
    })
  }
}

const websocketService = new WebSocketService()

export default websocketService
