import React, { createContext, useEffect, useState } from 'react'
import Connection from './connection'
import Publisher from './Publisher'
import Subscriber from './subscriber'
import Receiver from './Receiver'
import mqtt from 'mqtt'

export const QosOption = createContext([])
const qosOption = [
  {
    label: '0',
    value: 0,
  },
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
]

const HookMqtt = () => {
  const [connectStatus, setConnectStatus] = useState('Connect')
  const [client, setClient] = useState(() => {
    const newPort = 8083
    const newHost = 'mqtttest.connio.cloud'
    const url = `ws://${newHost}:${newPort}/mqtt`
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    }
    options.clientId = 'digiterra-coding-task-1'
    options.username = 'muzaffer'
    options.password = 'muzaffer46'
    setConnectStatus('Connecting')
    return mqtt.connect(url, options)
  })

  const [isSubed, setIsSub] = useState(false)
  const [payload, setPayload] = useState({})

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus('Connecting')
    setClient(mqtt.connect(host, mqttOption))
  }

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected')
      })
      client.on('error', (err) => {
        console.error('Connection error: ', err)
        client.end()
      })
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting')
      })
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() }
        setPayload(payload)
      })
    }
  }, [client])

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect')
      })
    }
  }

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log('Publish error: ', error)
        }
      })
    }
  }

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      })
    }
  }

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        setIsSub(false)
      })
    }
  }
  console.log('client', client)
  return <>{client ? 'Connected' : 'Disconnected'}</>
}

export default HookMqtt
