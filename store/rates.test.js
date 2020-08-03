import Vuex from 'vuex'
import moment from 'moment'
import { createLocalVue } from '@vue/test-utils'

describe('store/rates', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let NuxtStore
  let store

  const ratesData = [
    { fecha: moment(), valor: 100 },
    { fecha: moment().subtract(1, 'days'), valor: 200 },
    { fecha: moment().subtract(3, 'years'), valor: 200 },
  ]
  // TODO: Setting Axios with jest to fetch real data
  // const getDolarSettings = {
  //   url: `https://mindicador.cl/api/dolar/2020`,
  //   valuesKey: 'serie',
  // }

  beforeAll(async () => {
    const storePath = `${process.env.buildDir}/store.js`
    NuxtStore = await import(storePath)
  })

  beforeEach(async () => {
    store = await NuxtStore.createStore()
  })

  describe('Setting Up Start Date', () => {
    test('Setting startDataDate', () => {
      store.dispatch('nuxtServerInit')
      const starDate = moment(store.getters.getStartDataDate, 'YYYY-MM-DD')
      const endDate = moment(store.getters.getEndDataDate, 'YYYY-MM-DD')
      expect(starDate.isSameOrBefore(endDate)).toBe(true)
    })
  })

  describe('Setting raw data', () => {
    test('Getting Raw Data', () => {
      store.dispatch('nuxtServerInit')
      store.commit('ADD_RAW_DAILY_RATES', ratesData)
      expect(store.getters.getRawDailyRates.length).toBeGreaterThan(0)
    })
  })

  describe('Set and Get processed data', () => {
    let processedData
    beforeAll(() => {
      store.commit('RESET_RAW_DAILY_RATES')
      store.dispatch('nuxtServerInit')
      store.commit('ADD_RAW_DAILY_RATES', ratesData)
      store.dispatch('processFetchedData')
      processedData = store.getters.getProcessedDailyRates
    })

    test('Process Raw Data', () => {
      expect(processedData.length).toBeGreaterThan(0)
    })
    test('Filter dates outside the range', () => {
      expect(processedData.length).toBeLessThan(3)
    })
    test('To have right values', () => {
      expect(typeof processedData[0]).toBe('object')
      expect(typeof processedData[0].value).toBe('number')
      expect(moment(processedData[0].date).isValid()).toBe(true)
    })
  })
})
