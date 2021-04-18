import React, { useContext, useState, useEffect } from 'react'
import mqtt from 'mqtt'

import { getFullTime } from '../utilties'
const queryTopic = 'resolveMyQuery'
const url = 'ws://test.mosquitto.org:8080'
const ChartContext = React.createContext()
const useChartsContext = () => useContext(ChartContext)
function ChartsProvider({ children }) {
  const [state, setState] = useState({
    times: [],
    disconnectedList: [],
    connectedList: [],
    activeSubscriptionsList: [],
    messages: {
      sent: [],
      dropped: [],
      received: [],
    },
  })
  useEffect(() => {
    const mqttClient = mqtt.connect(url)
    console.log('mqtt', mqtt)
    mqttClient.on('connect', () => {
      mqttClient.subscribe(queryTopic)
    })
    mqttClient.on('message', (topic, message) => {
      const parsedData = JSON.parse(message)
      const {
        connected,
        disconnected,
        activeSubscriptions,
        messages,
        messageDropped,
        messageReceived,
        messageSent,
      } = parsedData
      console.log('parsed data', parsedData)
      console.log('connect, disconnect', connected, disconnected)

      setState((prevState) => ({
        ...prevState,
        times: [...prevState.times, getFullTime()],
        connectedList: [...prevState.connectedList, connected],
        disconnectedList: [...prevState.disconnectedList, disconnected],
        activeSubscriptionsList: [
          ...prevState.activeSubscriptionsList,
          activeSubscriptions,
        ],
        messages: {
          sent: [...prevState.messages.sent, messageSent],
          dropped: [...prevState.messages.dropped, messageDropped],
          received: [...prevState.messages.received, messageReceived],
        },
      }))
    })
  }, [])

  const value = { ...state }

  return <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
}

export { ChartsProvider, useChartsContext }
