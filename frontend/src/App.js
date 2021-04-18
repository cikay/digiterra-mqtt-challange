import React, { useState, useEffect } from 'react'
import mqtt from 'mqtt'

import clientsData from './components/clientsData'
import { Row, Col } from 'react-bootstrap'
import CustomizedChart from './components/CustomizedChart'

const queryTopic = 'resolveMyQuery'
const responseTopic = 'responseFromServer'
const url = 'ws://test.mosquitto.org:8080'
function App() {
  const [connectionStatus, setConnectionStatus] = React.useState(false)
  const [clientsChartData, setClientsChartData] = useState({
    labels: [],
    connectedList: [],
    disconnectedList: [],
  })

  useEffect(() => {
    const mqttClient = mqtt.connect(url)
    console.log('mqtt', mqtt)
    mqttClient.on('connect', () => {
      setConnectionStatus(true)
      mqttClient.subscribe(queryTopic)
    })
    mqttClient.on('message', (topic, message) => {
      const parsedData = JSON.parse(message)
      const { connected, disconnected } = parsedData
      console.log('connect, disconnect', connected, disconnected)
      setClientsChartData((prevState) => ({
        ...prevState,
        connectedList: [...prevState.connectedList, connected],
        disconnectedList: [...prevState.disconnectedList, disconnected],
        labels: [...prevState.labels, new Date().getSeconds()],
      }))
      console.log('parsedData', parsedData)
      console.log('clientsChartData', clientsChartData)
    })
  }, [])

  return (
    <>
      <Row>
        <Col xs={12} sm={6}>
          <CustomizedChart
            labels={clientsChartData.labels}
            connectedList={clientsChartData.connectedList}
            disconnectedList={clientsChartData.disconnectedList}
          />
        </Col>
      </Row>
    </>
  )
}

export default App
