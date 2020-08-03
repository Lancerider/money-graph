import {
  sortRatesByDate,
  calculateDailyFluctuation,
} from '@/utils/ratesUtils.js'

export const namespaced = false
export const state = () => ({
  startDate: undefined,
  endDate: undefined,
  dailyRatesRaw: [],
})

export const mutations = {
  RESET_RAW_DAILY_RATES: (state) => {
    state.dailyRatesRaw = []
  },
  ADD_RAW_DAILY_RATES: (state, dailyPriceData) => {
    state.dailyRatesRaw = [...state.dailyRatesRaw, ...dailyPriceData]
  },
}

export const actions = {
  GET_RATES({ commit }, settings) {
    return new Promise((resolve, reject) => {
      const { url, valuesKey } = settings
      this.$axios.$get(url).then((dailyPriceData) => {
        commit('ADD_RAW_DAILY_RATES', dailyPriceData[valuesKey])
        resolve(dailyPriceData)
      })
    })
  },
}

export const getters = {
  getRawDailyRates: (state) => {
    return state.dailyRatesRaw
  },
  getSortedDailyRates: (state) => {
    const dailyRatesRaw = [...state.dailyRatesRaw]
    // eslint-disable-next-line no-console
    console.log('getSortedDailyRates')
    const sortRates = sortRatesByDate(dailyRatesRaw, 'fecha', 'valor')

    return sortRates
  },
  getDailyRatesFluctuation: (state, getters) => {
    // eslint-disable-next-line no-console
    console.log('getDailyRatesFluctuation')
    const dailyRates = getters.getSortedDailyRates
    const fluctuationArray = calculateDailyFluctuation(
      dailyRates,
      'fecha',
      'valor'
    )
    // eslint-disable-next-line no-console
    // console.log('Console log : fluctuationArray', fluctuationArray)

    return fluctuationArray
  },
}
