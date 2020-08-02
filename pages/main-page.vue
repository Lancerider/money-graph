<template>
  <div class="container">
    <div class="ribbon top">
      <nuxt-link to="/" prefetch>
        Volver
      </nuxt-link>
    </div>
    <div class="content">
      <div class="links">
        <!-- TODO: handle No Data Fetched -->
        <dolarChart
          :chart-data="dailyRatesProcessed"
          label="Dolar Rates"
          :options="chartOptions"
        />
      </div>
    </div>
    <div class="ribbon"></div>
  </div>
</template>

<script>
import dolarChart from '@/components/dolarChart.vue'

export default {
  name: 'MainPage',
  components: {
    dolarChart,
  },
  async fetch({ store, $axios, env }) {
    if (this.isDataFetched) return

    try {
      const getDolarSettings = {
        url: `${env.exchangeApi_BaseUrl}/dolar/2020`,
        valuesKey: env.exchangeApi_ValuesKey,
      }
      await store.dispatch('GET_RATES', getDolarSettings)
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
      },
      isDataFetched: false,
    }
  },
  computed: {
    dailyRatesProcessed() {
      return this.$store.getters.getSortedDailyRates
    },
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
</style>
