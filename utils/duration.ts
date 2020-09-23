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
  if (horizonValue === MAX_ITERATIONS) {
    horizonValue = Infinity
  }
  return getDuration(horizonValue, horizonPeriod)
}

export function computeGraphModel (graph: any, model: any) {
  const { amountPeriod, optimizationValue, optimizationPeriod } = model
  const secondsPerOptimisation = convertDuration(getDuration(optimizationValue, optimizationPeriod), 'seconds')
  const secondsPerPeriod = computeDuration({ ...model, horizonValue: 1, horizonPeriod: amountPeriod }).seconds
  const periods = Object.values(computeProfitableDuration(model))[0]

  graph.data = []
  for (let x = 0; x < periods + 2; x++) {
    graph.data.push({
      x,
      y: x * secondsPerPeriod,
      height: secondsPerPeriod,
      label: `Machin ${x + 1}`
    })
  }
  graph.optimisation = {
    // y: periods * secondsPerPeriod,
    y: secondsPerOptimisation,
    label: `Truc ${secondsPerOptimisation}`
  }
}
