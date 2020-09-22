// @ts-ignore
import { durationToUnit } from '@ryki/datemath'

function getDuration (value:number, period:string) {
  return { [period]: value }
}

function convertDuration (duration:any, unit:string) {
  return durationToUnit(duration, unit, 1, new Date())
}

export function computeDuration (model:any) {
  const { durationValue, durationPeriod, amountValue, amountPeriod, horizonValue, horizonPeriod, isWorkingPeriod } = model
  const secondsPerEvent = convertDuration(getDuration(durationValue, durationPeriod), 'seconds')
  const daysPerHorizon = convertDuration(getDuration(horizonValue, horizonPeriod), 'days')
  const eventsPerDay = convertDuration(getDuration(amountValue, amountPeriod), 'days')
  let secondsPerHorizon = secondsPerEvent * eventsPerDay * daysPerHorizon

  if (isWorkingPeriod && amountPeriod !== 'years') {
    // 228 theoretical working days per french year (https://www.juristique.org/social/duree-du-travail#Calcul_de_la_duree_du_travail_legale_annuelle_base_35H00)
    // We ignore yearly periods because X times per year is X times per year, no matter you're working or not.
    secondsPerHorizon /= 365 / 228
  }

  return { seconds: secondsPerHorizon }
}

export function computeMinimumProfitableDuration (model: any) {

}
