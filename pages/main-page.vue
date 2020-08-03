<template>
  <div class="container">
    <div class="ribbon top">
      <nuxt-link to="/" prefetch>
        Volver
      </nuxt-link>
    </div>
    <div class="content">
      <div class="links"></div>
      <!-- TODO: handle No Data Fetched -->
      <dolarChart
        :chart-data="dailyRatesProcessed"
        label="Variación del Dolar"
        :options="chartOptions"
      />
    </div>
    <div class="ribbon"></div>
  </div>
</template>

<script>
import dolarChart from '@/components/dolarChart.vue'
import moment from 'moment'

export default {
  name: 'MainPage',
  components: {
    dolarChart,
  },
  async fetch({ store, $axios, env }) {
    if (this.isDataFetched) return

    const {
      exchangeApi_DefaultRange: defaultRange,
      exchangeApi_BaseUrl: baseUrl,
      exchangeApi_ValuesKey: valuesKey,
    } = env

    store.commit('RESET_RAW_DAILY_RATES')

    try {
      // const startDate = moment().subtract(defaultRange, 'years')
      const totalApiCalls = defaultRange
      const apiAsyncCalls = []

      // Make several calls to exchange API
      for (let i = 0; i <= totalApiCalls; i++) {
        const endDate = moment() // Now
        const year = endDate.subtract(i, 'years').format('YYYY')

        const getDolarSettings = {
          url: `${baseUrl}/dolar/${year}`,
          valuesKey,
        }

        const apiCall = store.dispatch('GET_RATES', getDolarSettings)

        apiAsyncCalls.push(apiCall)
      }

      await Promise.all(apiAsyncCalls)
      this.isDataFetched = true
    } catch (error) {
      // TODO: connect Sentry
      // eslint-disable-next-line no-console
      console.error('nuxtServerInit -> error fetching dolar rates', error)
      this.isDataFetched = false
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        // tooltips: {
        //   callbacks: {
        //     label(tooltipItem, data) {
        //       return `${tooltipItem.yLabel} CLP`
        //     },
        //   },
        // },
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
      },
      isDataFetched: false,
    }
  },
  computed: {
    dailyRatesProcessed() {
      return this.$store.getters.getDailyRatesFluctuation
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.$store.getters.getRawDailyRates)
  },
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
}

.ribbon {
  background: #ff8a32;
  min-height: 100px;
  padding: 20px;
  &.top {
    a {
      display: flex;
      justify-content: flex-start;
      color: #fff;
    }
  }
}

.top a {
  justify-self: start;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
  margin: 2rem 0;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.content {
  padding: 20px 40px;
  canvas {
    height: 600px;
  }
}
</style>
