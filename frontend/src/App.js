import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useChartsContext, ChartsProvider } from './ChartsContext'
import ActiveSubscribers from './components/ActiveSubscribers'
import ClientsChard from './components/ClientsChard'
import MessagesCharts from './components/MessagesChart'
import withProvider from './hoc/withProvider'

function App() {
  const {
    activeSubscriptionsList,
    disconnectedList,
    connectedList,
    times,
    messages,
  } = useChartsContext()
  return (
    <div className='my-2'>
      <Row className='mx-auto'>
        <Col xs={12} sm={4}>
          <ClientsChard
            labels={times}
            connectedList={connectedList}
            disconnectedList={disconnectedList}
          />
        </Col>
        <Col xs={12} sm={4}>
          <ActiveSubscribers labels={times} data={activeSubscriptionsList} />
        </Col>
        <Col xs={12} sm={4}>
          <MessagesCharts labels={times} messages={messages} />
        </Col>
      </Row>
    </div>
  )
}

export default withProvider(App, ChartsProvider)
