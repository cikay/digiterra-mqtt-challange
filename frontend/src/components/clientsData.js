export const data = {
  labels: [new Date().getUTCMonth()],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
  ],
}

export const lineOptions = {
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        // stacked: true,
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: true,

          userCallback(value) {
            // Convert the number to a string and splite the string every 3 charaters from the end
            value = value.toString()
            value = value.split(/(?=(?:...)*$)/)

            // Convert the array to a string and format the output

            return value
          },
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
}

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

export default { data, lineOptions }
