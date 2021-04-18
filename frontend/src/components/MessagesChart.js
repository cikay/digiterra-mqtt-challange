import React from 'react'
import { Line } from 'react-chartjs-2'

function MessagesCharts({ messages, labels }) {
  const { dropped, sent, received } = messages
  console.log('messages', messages)
  const data = {
    labels,
    datasets: [
      {
        label: 'Gönderilen',
        borderColor: '#E56399',
        fill: false,
        data: sent,
      },
      {
        label: 'Ulaşılan',
        borderColor: '#C6C8EE',
        fill: false,
        data: received,
      },
      {
        label: 'Silinen',
        borderColor: '#F6D8AE',
        fill: false,
        data: dropped,
      },
    ],
  }

  return (
    <>
      <Line data={data}></Line>
    </>
  )
}

export default MessagesCharts
