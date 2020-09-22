// @ts-ignore
import { durationToUnit } from '@ryki/datemath'

function getDuration (value:number, period:string) {
  return { [period]: value }
}

function convertDuration (duration:any, unit:string) {
  return durationToUnit(duration, unit, 1, new Date())
}

export function computeDuration (model:any) {
  const { gainValue, gainPeriod, amountValue, amountPeriod, horizonValue, isWorkingPeriod } = model
  const durationSeconds = convertDuration(getDuration(gainValue, gainPeriod), 'seconds')
  let amountFactorPerYear = 365 / convertDuration(getDuration(1, amountPeriod), 'days')
  if (isWorkingPeriod && amountPeriod !== 'years') {
    // 228 theoretical working days per french year (https://www.juristique.org/social/duree-du-travail#Calcul_de_la_duree_du_travail_legale_annuelle_base_35H00)
    // We ignore yearly periods because X times per year = X times per year, wether you're working or not.
    amountFactorPerYear /= 365 / 228
  }
  const amountPerYear = amountValue * amountFactorPerYear
  const secondsPerYear = durationSeconds * amountPerYear
  const secondsPerYears = secondsPerYear * horizonValue

  return { seconds: secondsPerYears }
}
