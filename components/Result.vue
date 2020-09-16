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
      , cette optimisation vous fera gagner :
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
      <div v-if="isDurationSignificant(Object.keys(periods)[0])" class="grid items-center grid-cols-2 gap-6 mt-4 -ml-32 text-lg font-medium">
        <div class="text-right">
          Soit
        </div>
        <div class="font-medium text-left duration-label">
          <table>
            <tbody>
              <tr
                v-for="(name, period) in periods"
                v-if="isDurationSignificant(period) && !formattedDuration.includes(name)"
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
      <div class="mt-2" title="Au rythme d’une blague toutes les 1 minute ½ !">
        (Ou le temps pour raconter <span class="text-lg font-medium duration-label">{{ formatJokeAmounts() }}</span> de qualité discutable.)
      </div>
    </div>

    <!-- <h2 class="mt-6 mb-0">
      Seuil de rentabilité
    </h2>
    <div class="text-gray-700">
      Au bout de combien de temps est-il rentable de mettre en place cette optimisation ?
    </div>
    <div class="mt-2">
      Sur un horizon de
      <div class="w-auto select-container">
        <select
          v-model="model.frequencyValue"
        >
          <option>1 an</option>
          <option>2 ans</option>
          <option>3 ans</option>
          <option>4 ans</option>
          <option>5 ans</option>
          <option>10 ans</option>
          <option>Autre…</option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      , vous serez gagnant si cette optimisation vous prend moins de <span class="text-xl font-semibold tracking-tight text-blue-600">21 heures</span> à mettre en place.
    </div>
    <div class="grid items-center grid-cols-2 gap-6 mt-6 -ml-6 text-lg font-medium">
      <div class="text-right">
        Soit
      </div>
      <div class="text-left">
        1260 minutes<br>
        3 jours de travail<br>
        0,75 jour de vie<br>
        0,27 semaine<br>
        0,06 mois<br>
      </div>
    </div>
    <img class="mx-auto mt-8 mb-2 border-2 border-blue-400 rounded-lg" src="https://dummyimage.com/350x200/fff/aaa"> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
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
              // @ts-ignore
              this.formatDuration(periodDuration, period, this.periods[period], true),
              // @ts-ignore
              this.formatDuration(previousPeriodDuration, previousPeriod, this.periods[previousPeriod], true)
            ].join(' et ')
          } else {
            // @ts-ignore
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
    formatJokeAmounts () {
      const duration = Math.round(
        durationToUnit(this.totalDuration, 'seconds') / 90
      )
      const name = 'blague'
      return `${duration.toLocaleString()} ${name}${
        duration > 1 && name[name.length - 1] !== 's' ? 's' : ''
      }`
    },
    isDurationSignificant (unit: string) {
      const duration = durationToUnit(this.totalDuration, unit)
      return duration >= 0.1
    },
    formatDurationParts (durationObject: Object, unit: string, name: string, isAtomic: boolean = false) {
      const duration = durationToUnit(durationObject, unit)
      const locale = 'fr-FR'
      const unitIsAtomic = ['seconds', 'minutes'].includes(unit) || isAtomic
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
