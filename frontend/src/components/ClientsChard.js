import React from 'react'
import { Line } from 'react-chartjs-2'

function ClientsChard({ connectedList, labels, disconnectedList }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Connected Clients',
        borderColor: '#7DDF64',
        fill: false,
        data: connectedList,
      },
      {
        label: 'Disconnected Clients',
        fill: false,
        borderColor: '#E70E02',
        data: disconnectedList,
      },
    ],
  }

  return (
    <>
      <Line data={data}></Line>
    </>
  )
}

export default ClientsChard
