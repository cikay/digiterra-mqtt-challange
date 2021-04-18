import React, { useRef, useState, useEffect } from 'react'
import Chartjs from 'chart.js'
import { Line } from 'react-chartjs-2'

const chartConfig = {
  type: 'line',
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
}

function CustomizedChart({ connectedList, labels, disconnectedList }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Connected Clients',
        fill: false,
        lineTension: 0.1,

        borderColor: '#7DDF64',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',

        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,

        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: connectedList,
      },
      {
        label: 'Disconnected Clients',
        fill: false,
        lineTension: 0.1,

        borderColor: '#E70E02',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,

        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: disconnectedList,
      },
    ],
  }
  console.log('customized chart')
  return (
    <>
      <Line data={data}></Line>
    </>
  )
}

export default CustomizedChart
