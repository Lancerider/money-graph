<script>
import { Line } from 'vue-chartjs'
import moment from 'moment'
// eslint-disable-next-line no-console

export default {
  extends: Line,
  props: {
    label: {
      type: String,
      default: '',
    },
    chartData: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    const dates = this.chartData.map((dayRate) =>
      moment(dayRate.date).format('DD-MM-YYYY')
    )
    const dolarRates = this.chartData.map((dolarRate) => dolarRate.value)

    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: this.label,
            data: dolarRates,
            borderColor: 'black',
            backgroundColor: '#ff8a32aa',
            borderWidth: '1',
            pointRadius: '0',
          },
        ],
      },
      this.options
    )
  },
}
</script>
