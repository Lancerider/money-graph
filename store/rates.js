import { sortRatesByDate } from '@/utils/ratesUtils.js'

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
    const sortRates = sortRatesByDate(dailyRatesRaw, 'fecha', 'valor')
    return sortRates
  },
  getDailyRatesVariations: (state) => {
    // eslint-disable-next-line no-console
    console.log('getDailyRatesVariations')
    return state.dailyRatesRaw
  },
}
