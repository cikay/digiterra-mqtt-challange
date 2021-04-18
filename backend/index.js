const mqtt = require("mqtt")
const mqttClient = mqtt.connect('ws://test.mosquitto.org:8080')

const queryTopic = 'resolveMyQuery'
const responseTopic = 'responseFromServer'

mqttClient.on('connect', function () {
  console.log('Server connected to Mqtt broker')
  setInterval(() => {
    const data = getData()
    mqttClient.publish(queryTopic, JSON.stringify(data))
    console.log('sent message', data)
  }, 5000)
})

function getData() {
  const activeSubscriptions = getRndInteger(5, 20)
  const connected = getRndInteger(0, activeSubscriptions)
  const disconnected = activeSubscriptions - connected
  return {
    activeSubscriptions,
    connected,
    disconnected,
    maxConnected: 1002,
    messageBytesReceived: 25294587,
    messageBytesSent: 188172,
    messageDropped: 2116589,
    messageReceived: 2132285,
    messageSent: 15681,
    offlineSessions: 8,
    packetReceived: 375787,
    packetSent: 5289,
    pendingMessages: 0,
    rejected: 0,
    retainedMessages: 0,
    subscribed: 84,
    unsubscribed: 0,
  }
}

// On receiving message from any client
mqttClient.on('message', function (topic, message) {
  console.log('Received query from client: -', message.toString())
  // Responding to client
})

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
