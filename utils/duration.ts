// @ts-ignore
import { durationToUnit } from '@ryki/datemath'

function getDuration (value:number, period:string) {
  return { [period]: value }
}

function convertDuration (duration:any, unit:string) {
  return durationToUnit(duration, unit, 1, new Date())
}

export function computeDuration (model:any) {
  const { gainValue, gainPeriod, frequencyValue, frequencyPeriod, horizonValue, isWorkingPeriod } = model
  const durationSeconds = convertDuration(getDuration(gainValue, gainPeriod), 'seconds')
  let frequencyYearlyDays = 365 / convertDuration(getDuration(1, frequencyPeriod), 'days')
  if (isWorkingPeriod && frequencyPeriod !== 'years') {
    // Theoritical working days per year (https://www.juristique.org/social/duree-du-travail#Calcul_de_la_duree_du_travail_legale_annuelle_base_35H00)
    frequencyYearlyDays = 228 / convertDuration(getDuration(1, frequencyPeriod), 'days')
  }
  const frequencyDays = frequencyValue * frequencyYearlyDays
  const totalYearlySeconds = durationSeconds * frequencyDays
  const totalSeconds = totalYearlySeconds * horizonValue

  return { seconds: totalSeconds }
}
