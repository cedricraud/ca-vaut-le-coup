// @ts-nocheck
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
export const INVERTED_PERIODS = Object.keys(PERIODS).reduce((ret: Object, key: string) => {
  ret[PERIODS[key]] = key
  return ret
}, {})

const DEFAULT_OPTIMIZATION_VALUE = 30
const DEFAULT_OPTIMIZATION_PERIOD = 'minutes'

function isDurationAtomic (unit: string) {
  return ['seconds', 'minutes'].includes(unit)
}

export function isDurationSignificant (durationObject: Object, unit: string) {
  const duration = convertDuration(durationObject, unit)
  return duration >= (isDurationAtomic(unit) ? 1 : 0.1)
}

function pluralize (name: string, amount: number) {
  return `${name}${
    amount > 1 && name[name.length - 1] !== 's' ? 's' : ''
  }`
}

export function formatDurationParts (durationObject: Object, unit: string, name: string, isAtomic: boolean = false) {
  const duration = convertDuration(durationObject, unit)
  const locale = 'fr-FR'
  const unitIsAtomic = isDurationAtomic(unit) || isAtomic
  const options = {
    maximumFractionDigits: unitIsAtomic ? 0 : 1
  }
  const formattedDuration = duration.toLocaleString(locale, options)
  const formattedName = pluralize(name, duration)

  return [formattedDuration, formattedName]
}

export function formatDuration (durationObject: Object, unit: string, name: string, isAtomic: boolean = false) {
  return formatDurationParts(durationObject, unit, name, isAtomic).join(' ')
}

export function formatSimpleDuration (duration: number, period: string) {
  return formatDuration(getDuration(duration, period), period, (<any> PERIODS)[period], false)
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

  return getDuration(horizonValue || 1, horizonPeriod)
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

function unformatPeriod (period: string) {
  return INVERTED_PERIODS[period] || INVERTED_PERIODS[period.slice(0, -1)]
}

function formatPeriod (period: string, amount: numer = 1) {
  return pluralize(PERIODS[period], amount)
}

// Based on https://gist.github.com/codeguy/6684588
const SLUG_SEPARATOR = '-'
const NEWLINE_SEPARATOR = '+'
function slugify (text) {
  return text
    .toString()
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036F]/g, '') // remove all previously split accents
    .trim()
    .replace(/\n/gm, NEWLINE_SEPARATOR)
    .replace(/[^A-Za-z0-9+ ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, SLUG_SEPARATOR)
}

function unslugify (text) {
  return text
    .toString()
    .replace(new RegExp(`[${NEWLINE_SEPARATOR}]`, 'gm'), '\n')
    .replace(new RegExp(SLUG_SEPARATOR, 'g'), ' ')
}

export function initPath (path) {
  const pathParts = path.split('/')
  const modelParts = (pathParts[1] || '').split('-')

  if (modelParts.length === 6 || modelParts.length === 9) {
    const task = unslugify(pathParts[2] || '')
    const durationValue = +modelParts[0]
    const durationPeriod = unformatPeriod(modelParts[1])
    const amountValue = +modelParts[2]
    const amountPeriod = unformatPeriod(modelParts[5])
    const optimizationValue = modelParts[7] ? +modelParts[7] : DEFAULT_OPTIMIZATION_VALUE
    const optimizationPeriod = modelParts[8] ? unformatPeriod(modelParts[8]) : DEFAULT_OPTIMIZATION_PERIOD

    return { task, durationValue, durationPeriod, amountValue, amountPeriod, optimizationValue, optimizationPeriod }
  } else {
    return {}
  }
}

export function generatePath (model: any) {
  const { task, durationValue, durationPeriod, amountValue, amountPeriod, optimizationValue, optimizationPeriod } = model
  const formattedOptimization = optimizationValue !== DEFAULT_OPTIMIZATION_VALUE || optimizationPeriod !== DEFAULT_OPTIMIZATION_PERIOD ? `-vs-${optimizationValue}-${formatPeriod(optimizationPeriod, optimizationValue)}` : ''
  const formattedTask = slugify(task) ? '/' + slugify(task) : ''
  return `/${durationValue}-${formatPeriod(durationPeriod, durationValue)}-${amountValue}-fois-par-${formatPeriod(amountPeriod)}${formattedOptimization}${formattedTask}`
}
