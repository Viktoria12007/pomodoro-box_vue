export function displayTime(minutes) {
  if (minutes >= 60) {
    const remainderOfDivision = minutes % 60
    return `${(minutes - remainderOfDivision) / 60} ч ${Math.round(remainderOfDivision)} мин`
  } else if (minutes >= 1 && minutes < 60) {
    return `${Math.round(minutes)} мин`
  } else {
    return `${Math.round(minutes * 100) / 100} мин`
  }
}
