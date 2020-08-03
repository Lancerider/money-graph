import moment from 'moment'

import {
  sortRatesByDate,
  calculateDailyFluctuation,
  filterDates,
  formatRatesDataKeys,
} from '@/utils/ratesUtils.js'

export const namespaced = false
export const state = () => ({
  dailyRatesRaw: [],
  dailyRatesProcessed: [],
  endDataDate: moment(), // Now
  startDataDate: moment(), // Now
})

export const mutations = {
  SET_PROCESSED_DAILY_RATES: (state, dailyPriceData) => {
    state.dailyRatesProcessed = dailyPriceData
  },
  RESET_RAW_DAILY_RATES: (state) => {
    state.dailyRatesRaw = []
  },
  ADD_RAW_DAILY_RATES: (state, dailyPriceData) => {
    state.dailyRatesRaw = [...state.dailyRatesRaw, ...dailyPriceData]
  },
  SET_START_DATA_DATE: (state, startFetchDate) => {
    state.startDataDate = startFetchDate
  },
}

export const actions = {
  nuxtServerInit({ commit }) {
    const startFetchDate = moment().subtract(
      process.env.exchangeApi_DefaultRange || 1,
      'years'
    )
    commit('SET_START_DATA_DATE', startFetchDate)
  },
  GET_RATES({ commit }, settings) {
    return new Promise((resolve, reject) => {
      const { url, valuesKey } = settings

      this.$axios.$get(url).then((dailyPriceData) => {
        commit('ADD_RAW_DAILY_RATES', dailyPriceData[valuesKey])
        resolve(dailyPriceData)
      })
    })
  },
  PROCESS_FETCHED_DATA({ commit, state }) {
    const dailyRatesRaw = [...state.dailyRatesRaw]
    const { startDataDate, endDataDate } = state
    const formatedKeysData = formatRatesDataKeys(
      dailyRatesRaw,
      'fecha',
      'valor'
    )
    const sortedRates = sortRatesByDate(formatedKeysData)
    const filteredDates = filterDates(sortedRates, startDataDate, endDataDate)
    commit('SET_PROCESSED_DAILY_RATES', filteredDates)
  },
}

export const getters = {
  getRawDailyRates: (state) => {
    return state.dailyRatesRaw
  },
  getProcessedDailyRates: (state) => {
    const sortRates = state.dailyRatesProcessed
    return sortRates
  },
  getDailyRatesFluctuation: (state, getters) => {
    const dailyRates = getters.getProcessedDailyRates
    const fluctuationArray = calculateDailyFluctuation(dailyRates)

    return fluctuationArray
  },
}
