// @ts-ignore
import { durationToUnit } from '@ryki/datemath'

export const PERIODS = {
  seconds: 'seconde',
  minutes: 'minute',
  hours: 'heure',
  days: 'jour',
  weeks: 'semaine',
  months: 'mois',
  years: 'an'
}

function isDurationAtomic (unit: string) {
  return ['seconds', 'minutes'].includes(unit)
}

export function isDurationSignificant (durationObject: Object, unit: string) {
  const duration = convertDuration(durationObject, unit)
  return duration >= (isDurationAtomic(unit) ? 1 : 0.1)
}

export function formatDurationParts (durationObject: Object, unit: string, name: string, isAtomic: boolean = false) {
  const duration = convertDuration(durationObject, unit)
  const locale = 'fr-FR'
  const unitIsAtomic = isDurationAtomic(unit) || isAtomic
  const options = {
    maximumFractionDigits: unitIsAtomic ? 0 : 1
  }
  const formattedDuration = duration.toLocaleString(locale, options)
  const formattedName = `${name}${
    duration > 1 && name[name.length - 1] !== 's' ? 's' : ''
  }`

  return [formattedDuration, formattedName]
}

export function formatDuration (durationObject: Object, unit: string, name: string, isAtomic: boolean = false) {
  return formatDurationParts(durationObject, unit, name, isAtomic).join(' ')
}

export function formatSimpleDuration (duration: number, period: string) {
  return formatDuration(getDuration(duration, period), period, (<any> PERIODS)[period], true)
}

function getDuration (value:number, period:string) {
  return { [period]: value }
}

export function convertDuration (duration:any, unit:string) {
  return durationToUnit(duration, unit, 1, new Date())
}

export function computeDuration (model:any) {
  const { durationValue, durationPeriod, amountValue, amountPeriod, horizonValue, horizonPeriod, isWorkingPeriod } = model
  const secondsPerEvent = convertDuration(getDuration(durationValue, durationPeriod), 'seconds')
  const daysPerHorizon = convertDuration(getDuration(horizonValue, horizonPeriod), 'days')
  const eventsPerDay = amountValue / convertDuration(getDuration(1, amountPeriod), 'days')
  let secondsPerHorizon = secondsPerEvent * eventsPerDay * daysPerHorizon

  if (isWorkingPeriod && amountPeriod !== 'years') {
    // 228 theoretical working days per french year (https://www.juristique.org/social/duree-du-travail#Calcul_de_la_duree_du_travail_legale_annuelle_base_35H00)
    // We ignore yearly periods because X times per year is X times per year, no matter you're working or not.
    secondsPerHorizon /= 365 / 228
  }

  return { seconds: secondsPerHorizon }
}

const MAX_ITERATIONS = 9999
export function computeProfitableDuration (model: any) {
  const { amountPeriod, optimizationValue, optimizationPeriod } = model
  const secondsPerOptimisation = convertDuration(getDuration(optimizationValue, optimizationPeriod), 'seconds')
  const horizonPeriod = amountPeriod
  let horizonValue = 0
  let secondsPerHorizon = 0
  while (secondsPerOptimisation > secondsPerHorizon && horizonValue < MAX_ITERATIONS) {
    horizonValue++
    secondsPerHorizon = computeDuration({ ...model, horizonValue, horizonPeriod }).seconds
  }

  return getDuration(horizonValue, horizonPeriod)
}

export function computeGraphModel (graph: any, model: any) {
  const { amountPeriod, optimizationValue, optimizationPeriod } = model
  const secondsPerPeriod = computeDuration({ ...model, horizonValue: 1, horizonPeriod: amountPeriod }).seconds
  const periods = Object.values(computeProfitableDuration(model))[0]

  graph.data = []
  // eslint-disable-next-line no-unmodified-loop-condition
  for (let x = 0; (x < periods * 2.3) || (!periods && x === periods); x++) {
    graph.data.push({
      x,
      y: x * secondsPerPeriod,
      height: secondsPerPeriod
    })
  }
  graph.profitable = {
    x: periods,
    y: periods * secondsPerPeriod,
    period: amountPeriod,
    optimizationValue,
    optimizationPeriod
  }
}
