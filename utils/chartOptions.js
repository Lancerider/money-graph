import moment from 'moment'

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    callbacks: {
      label(tooltipItem, data) {
        return `${tooltipItem.yLabel} CLP`
      },
    },
  },
  scales: {
    xAxes: [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12.1,
          labelString: 'Fechas',
          maxRotation: 0,
          minRotation: 0,
          callback: (value, index, values) => {
            return moment(value, 'DD-MM-YYYY').format('MMM YYYY')
          },
        },
        scaleLabel: {
          display: true,
          labelString: 'Tiempo [dia]',
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Diferencia [CLP]',
        },
      },
    ],
  },
}
