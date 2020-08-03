/* eslint-disable no-console */
import moment from 'moment'

export const sortRatesByDate = (ratesArray) => {
  const sortedArray = ratesArray.sort((a, b) => {
    return moment(a.date).diff(b.date)
  })
  return sortedArray
}

export const filterDates = (datesArray, startDate, endDate) => {
  const filteredDates = datesArray.filter((dateData) => {
    const date = moment(dateData.date, 'YYYY-MM-DD')
    const isDateInRange =
      date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate)

    return isDateInRange
  })
  return filteredDates
}

export const formatRatesDataKeys = (ratesArray, datesKey, valuesKey) => {
  const dataKeysFormatted = ratesArray.map((dateData) => {
    return {
      date: dateData[datesKey],
      value: dateData[valuesKey],
    }
  })
  return dataKeysFormatted
}

export const calculateDailyFluctuation = (dailyRatesArray) => {
  const dailyFluctuations = dailyRatesArray.map((dayInfo, index) => {
    if (index === 0) {
      return {
        date: dayInfo.date,
        value: 0,
      }
    }
    const thisDayValue = dayInfo.value
    const previousDayValue = dailyRatesArray[index - 1].value
    const dailyPriceDifference = thisDayValue - previousDayValue

    return {
      date: dayInfo.date,
      value: dailyPriceDifference.toFixed(2),
    }
  })

  return dailyFluctuations
}
