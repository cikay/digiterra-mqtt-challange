import React, { useState, useEffect } from 'react'
import HookMqtt from './HookMqtt'
import mqtt from 'mqtt'

const queryTopic = 'resolveMyQuery'
const responseTopic = 'responseFromServer'
const url = 'ws://test.mosquitto.org:8080'
function App() {
  const [connectionStatus, setConnectionStatus] = React.useState(false)
  const [messages, setMessages] = React.useState([])

  useEffect(() => {
    const mqttClient = mqtt.connect(url)
    console.log('mqtt', mqtt)
    mqttClient.on('connect', () => {
      setConnectionStatus(true)
      mqttClient.subscribe(queryTopic)
    })
    mqttClient.on('message', (topic, message) => {
      setMessages(messages.concat(message.toString()))
    })
  }, [])

  return (
    <>
      {messages.map((message) => (
        <h2>{message}</h2>
      ))}
    </>
  )
}

export default App
