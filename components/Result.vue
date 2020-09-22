<template>
  <div>
    <h2>Temps gagné</h2>
    <div>
      Sur un horizon de
      <div class="w-24 select-container">
        <select
          v-model.number="model.horizonValue"
          @change="emitModel"
        >
          <option value="1">
            1 an
          </option>
          <option value="2">
            2 ans
          </option>
          <option value="3">
            3 ans
          </option>
          <option value="4">
            4 ans
          </option>
          <option value="5">
            5 ans
          </option>
          <option value="10">
            10 ans
          </option>
          <!-- <option>Autre…</option> -->
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      , cette optimisation vous fera gagner&nbsp;:
    </div>
    <div class="text-center">
      <div
        class="inline-flex items-center mt-4 mb-1 text-gray-700"
        title="Le temps de travail est une estimation sur la base d’une semaine de 35 heures avec 5 semaines de congés par an."
      >
        <label>Temps de vie</label>
        <div class="relative inline-block w-10 mx-2 align-middle transition duration-200 ease-in">
          <input
            id="toggle"
            v-model="model.isWorkingPeriod"
            type="checkbox"
            name="toggle"
            class="absolute block w-6 h-6 bg-gray-600 border-none rounded-full appearance-none cursor-pointer toggle-checkbox focus:bg-indigo-400"
            @change="emitModel"
          >
          <label for="toggle" class="block h-6 overflow-hidden bg-white border-2 border-gray-500 rounded-full cursor-pointer select-none toggle-label" />
        </div>
        <label>Temps de travail</label>
      </div>
      <div class="mt-4 text-3xl font-semibold text-blue-600 duration-label">
        {{ formattedDuration }}
      </div>
      <div v-if="visiblePeriods.length" class="grid items-center grid-cols-2 gap-6 mt-4 -ml-32 text-lg font-medium">
        <div class="text-right">
          Soit
        </div>
        <div class="font-medium text-left duration-label">
          <table>
            <tbody>
              <tr
                v-for="[period, name] in visiblePeriods"
                :key="period"
              >
                <td class="pr-1 text-right">
                  {{ formatDurationParts(totalDuration, period, name)[0] }}
                </td>
                <td>
                  {{ formatDurationParts(totalDuration, period, name)[1] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="Number.parseInt(formattedJokes)" class="mt-2" title="Au rythme d’une blague toutes les 1 minute ½ !">
        (Ou le temps pour raconter <span class="text-lg font-medium duration-label">{{ formattedJokes }}</span> de qualité discutable.)
      </div>
    </div>

    <h2 class="mt-6">
      Seuil de rentabilité
    </h2>
    <!-- <div class="text-gray-700">
      Au bout de combien de temps gagnez-vous à mettre en place cette optimisation&nbsp;? -> Mauvaise question
      Si l'optimisation vous prend X temps, en combien de temps serez-vous gagnant ?
    </div> -->
    <div class="mt-2">
      Si cette optimisation vous prend
      <input
        v-model.number="model.optimizationValue"
        class="mb-2"
        type="number"
        step="1"
        min="1"
        inputmode="numeric"
        pattern="[0-9]*"
        @input="emitModel"
      >
      <div class="w-32 select-container">
        <select
          v-model="model.optimizationPeriod"
          @change="emitModel"
        >
          <option value="seconds">
            secondes
          </option>
          <option value="minutes">
            minutes
          </option>
          <option value="hours">
            heures
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      à mettre en place,<br>
      vous serez gagnant à partir de <span class="text-xl font-semibold text-blue-600 duration-label">21 heures</span>.
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from 'vue'
import { durationToUnit } from '@ryki/datemath'

const PERIODS = {
  seconds: 'seconde',
  minutes: 'minute',
  hours: 'heure',
  days: 'jour',
  weeks: 'semaine',
  months: 'mois'
}

export default Vue.extend({
  props: {
    value: {
      type: Object,
      default () {}
    },
    totalDuration: {
      type: Object,
      default () {}
    }
  },
  data () {
    return {
      model: {}
    }
  },
  computed: {
    periods () {
      return PERIODS
    },
    visiblePeriods () {
      return Object.keys(this.periods).reduce((memo, period) => {
        const name = PERIODS[period]
        if (this.isDurationSignificant(period) && !this.formattedDuration.includes(name)) {
          memo.push([period, name])
        }
        return memo
      }, [])
    },
    formattedJokes () {
      const duration = Math.round(
        durationToUnit(this.totalDuration, 'seconds') / 90
      )
      const name = 'blague'
      return `${duration.toLocaleString()} ${name}${
        duration > 1 && name[name.length - 1] !== 's' ? 's' : ''
      }`
    },
    formattedDuration () {
      const periods = Object.keys(this.periods)
      let formattedDuration:string = ''
      for (let i = periods.length; i >= 0; i--) {
        const period = periods[i]
        const duration = durationToUnit(this.totalDuration, period)
        if (duration >= 2 || i === 0) {
          const isSplitDurationEnabled = false
          const decimalDuration = duration - Math.floor(duration)
          if (isSplitDurationEnabled && decimalDuration > 0 && i > 0) {
            const previousPeriod = periods[i - 1]
            const periodDuration = { [period]: Math.floor(duration) }
            const previousPeriodDuration = { [period]: decimalDuration }
            formattedDuration = [

              this.formatDuration(periodDuration, period, this.periods[period], true),

              this.formatDuration(previousPeriodDuration, previousPeriod, this.periods[previousPeriod], true)
            ].join(' et ')
          } else {
            formattedDuration = this.formatDuration(this.totalDuration, period, this.periods[period])
          }
          break
        }
      }

      return formattedDuration
    }
  },
  watch: {
    value: 'initModel'
  },
  created () {
    this.initModel()
  },
  methods: {
    initModel () {
      this.model = { ...this.value }
    },
    emitModel () {
      this.$emit('input', this.model)
    },
    isDurationAtomic (unit: string) {
      return ['seconds', 'minutes'].includes(unit)
    },
    isDurationSignificant (unit: string) {
      const duration = durationToUnit(this.totalDuration, unit)
      return duration >= (this.isDurationAtomic(unit) ? 1 : 0.1)
    },
    formatDurationParts (durationObject: Object, unit: string, name: string, isAtomic: boolean = false) {
      const duration = durationToUnit(durationObject, unit)
      const locale = 'fr-FR'
      const unitIsAtomic = this.isDurationAtomic(unit) || isAtomic
      const options = {
        maximumFractionDigits: unitIsAtomic ? 0 : 1
      }
      const formattedDuration = duration.toLocaleString(locale, options)
      const formattedName = `${name}${
        duration > 1 && name[name.length - 1] !== 's' ? 's' : ''
      }`

      return [formattedDuration, formattedName]
    },
    formatDuration (durationObject: Object, unit: string, name: string, isAtomic: boolean = false) {
      return this.formatDurationParts(durationObject, unit, name, isAtomic).join(' ')
    }
  }
})
</script>

<style lang="postcss" scoped>
/* @apply rules for documentation, these do not work as inline style */
.toggle-checkbox:checked {
  right: 0;
  /* @apply: right-0 border-green-400;
  border-color: #68D391; */
}
.toggle-checkbox:checked + .toggle-label {
  /* @apply: bg-green-400;
  background-color: #68D391; */
}
</style>
