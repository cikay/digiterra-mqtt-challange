const mqtt = require('../frontend/node_modules/mqtt')
const mqttClient = mqtt.connect('ws://test.mosquitto.org:8080')

const queryTopic = 'resolveMyQuery'
const responseTopic = 'responseFromServer'

mqttClient.on('connect', function () {
  console.log('Server connected to Mqtt broker')
  setInterval(() => {
    const message = `my random number: ${Math.random() * 50}`
    mqttClient.publish(queryTopic, message)
    console.log('sent message', message)
  }, 5000)
})

// On receiving message from any client
mqttClient.on('message', function (topic, message) {
  console.log('Received query from client: -', message.toString())
  // Responding to client
})
