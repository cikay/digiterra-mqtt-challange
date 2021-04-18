import React from 'react'
import { Line } from 'react-chartjs-2'

function ActiveSubscribers({ data, labels }) {
  console.log('data', data)
  const _data = {
    labels,
    datasets: [
      {
        label: 'Active subscribers',
        borderColor: '#7DDF64',
        fill: false,
        data,
      },
    ],
  }

  return (
    <>
      <Line data={_data}></Line>
    </>
  )
}

export default ActiveSubscribers
