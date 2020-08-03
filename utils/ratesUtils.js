/* eslint-disable no-console */
import moment from 'moment'

export const sortRatesByDate = (ratesArray, datesKey) => {
  const sortedArray = ratesArray.sort((a, b) => {
    return moment(a[datesKey]).diff(b[datesKey])
  })
  return sortedArray
}

export const calculateDailyFluctuation = (
  dailyRatesArray,
  datesKey,
  valuesKey
) => {
  const dailyFluctuations = dailyRatesArray.map((dayInfo, index) => {
    if (index === 0) {
      return {
        date: dayInfo[datesKey],
        value: 0,
      }
    }
    const thisDayValue = dayInfo[valuesKey]
    const previousDayValue = dailyRatesArray[index - 1][valuesKey]
    const dailyPriceDifference = thisDayValue - previousDayValue

    return {
      date: dayInfo[datesKey],
      value: dailyPriceDifference.toFixed(2),
    }
  })

  return dailyFluctuations
}
// eslint-disable-next-line no-console
// const serie = data.serie.reverse()
// const dolarVariationArray = serie.map((dayInfo, index) => {
// if (index === 0) {
//   return 0
// }
// const dailyPriceVariation = dayInfo.valor - serie[index - 1].valor

// return {
//   fecha: dayInfo.fecha,
//   valor: dailyPriceVariation,
// }
// })
// { fecha: '2020-07-30T04:00:00.000Z', valor: 759.18 },
// eslint-disable-next-line no-console
// console.log('Console log : Data -> data', dolarVariationArray)
// return { dayRates: dolarVariationArray }
