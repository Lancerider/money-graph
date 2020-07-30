<template>
  <div class="container">
    <div class="ribbon top">
      <a href="/">
        Volver
      </a>
    </div>
    <div class="content">
      <div class="links">
        // TODO: handle No Data Fetched
        <dolarChart
          :chart-data="dayRates || []"
          label="Dolar Prices"
          :options="chartOptions"
        />
      </div>
    </div>
    <div class="ribbon"></div>
  </div>
</template>

<script>
import dolarChart from '@/components/dolarChart'

export default {
  name: 'MainPage',
  components: {
    dolarChart,
  },
  async asyncData({ $axios }) {
    // TODO: handling get error
    const data = await $axios.$get('https://mindicador.cl/api/dolar/2020')
    const serie = data.serie.reverse()
    const dolarVariationArray = serie.map((dayInfo, index) => {
      if (index === 0) {
        return 0
      }
      const dailyPriceVariation = dayInfo.valor - serie[index - 1].valor

      return {
        fecha: dayInfo.fecha,
        valor: dailyPriceVariation,
      }
    })
    // { fecha: '2020-07-30T04:00:00.000Z', valor: 759.18 },
    // eslint-disable-next-line no-console
    console.log('Console log : Data -> data', dolarVariationArray)
    return { dayRates: dolarVariationArray }
  },
  // created() {

  // }
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
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
