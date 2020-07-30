<script>
import { Line } from 'vue-chartjs'
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
    const dates = this.chartData.map((dayRate) => dayRate.fecha).reverse()
    const dolarRates = this.chartData
      .map((dolarRate) => dolarRate.valor)
      .reverse()

    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: this.label,
            data: dolarRates,
          },
        ],
      },
      this.options
    )
  },
}
</script>
