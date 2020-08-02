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
  SET_RAW_DAILY_Rates: (state, dailyPriceData) => {
    state.dailyRatesRaw = dailyPriceData
  },
}

export const actions = {
  async GET_RATES({ commit }, settings) {
    const { url, valuesKey } = settings
    const dailyPriceData = await this.$axios.$get(url)
    commit('SET_RAW_DAILY_Rates', dailyPriceData[valuesKey])
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
    console.log('Console log : fluctuationArray', fluctuationArray)

    return fluctuationArray
  },
}
