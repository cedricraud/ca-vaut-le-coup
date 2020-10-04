<template>
  <div class="small-inputs">
    <h2>Temps gagné</h2>
    <div>
      Sur un horizon de
      <div class="w-24 select-container">
        <select
          v-model.number="model.horizonValue"
          class="py-1 mb-1 sm:mb-0 sm:py-2"
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
      cette optimisation vous fera gagner&nbsp;:
    </div>
    <div class="text-center">
      <div
        class="inline-flex items-center mt-4 mb-1 text-gray-700"
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
        <label
          class="cursor-help"
          title="Le temps de travail est une estimation sur la base d’une semaine de 35 heures avec 5 semaines de congés par an."
        >Temps de travail</label>
      </div>
      <div class="mt-4 text-3xl font-semibold text-blue-600 duration-label">
        {{ formattedDuration }}
      </div>
      <div v-if="visiblePeriods.length" class="grid items-center grid-cols-2 gap-6 mt-4 -ml-32 text-lg">
        <div class="text-right">
          Soit
        </div>
        <div class="text-left duration-label">
          <table>
            <tbody>
              <tr
                v-for="[period, name] in visiblePeriods"
                :key="period"
              >
                <td class="pr-1 font-semibold text-right">
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
      <div
        v-if="Number.parseInt(formattedJokes)"
        class="mt-4 text-gray-700 duration-label"
        title="Au rythme d’une blague toutes les 1 minute ½ !"
      >
        Ou le temps de raconter {{ formattedJokes }} de qualité discutable.
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
      Si cela vous prend
      <div class="inline-block whitespace-no-wrap">
        <input
          v-model.number="model.optimizationValue"
          type="number"
          class="py-1 my-1 sm:py-2 sm:my-0"
          step="1"
          min="0"
          inputmode="numeric"
          pattern="[0-9]*"
          @focus="$event.target.select()"
          @input="emitModel"
        >
        <div class="w-32 select-container">
          <select
            v-model="model.optimizationPeriod"
            class="py-1 my-1 sm:py-2 sm:my-0 sm:mb-1"
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
            <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      à mettre en place, vous serez gagnant à partir de :

      <ProfitableGraph :model="model" />
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from 'vue'
import {
  PERIODS,
  convertDuration,
  isDurationSignificant,
  formatDuration,
  formatDurationParts
} from '@/utils/duration'

export default Vue.extend({
  props: {
    value: {
      type: Object,
      default () {}
    },
    totalDuration: {
      type: Object,
      default () {}
    },
    profitableDuration: {
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
        if (
          isDurationSignificant(this.totalDuration, period) &&
          !this.formattedDuration.includes(name)
        ) {
          memo.push([period, name])
        }
        return memo
      }, [])
    },
    formattedJokes () {
      const duration = Math.round(
        convertDuration(this.totalDuration, 'seconds') / 90
      )
      const name = 'blague'
      return `${duration.toLocaleString()} ${name}${
        duration > 1 && name[name.length - 1] !== 's' ? 's' : ''
      }`
    },
    formattedProfitableDuration () {
      const profitableDuration = this.profitableDuration
      const period = Object.keys(profitableDuration)[0]
      const name = PERIODS[period]
      return formatDuration(profitableDuration, period, name, true)
    },
    formattedDuration () {
      const periods = Object.keys(this.periods)
      let formattedDuration: string = ''
      for (let i = periods.length; i >= 0; i--) {
        const period = periods[i]
        const duration = convertDuration(this.totalDuration, period)
        if (duration >= 2 || i === 0) {
          const isSplitDurationEnabled = false
          const decimalDuration = duration - Math.floor(duration)
          if (isSplitDurationEnabled && decimalDuration > 0 && i > 0) {
            const previousPeriod = periods[i - 1]
            const periodDuration = { [period]: Math.floor(duration) }
            const previousPeriodDuration = { [period]: decimalDuration }
            formattedDuration = [
              formatDuration(
                periodDuration,
                period,
                this.periods[period],
                true
              ),
              formatDuration(
                previousPeriodDuration,
                previousPeriod,
                this.periods[previousPeriod],
                true
              )
            ].join(' et ')
          } else {
            formattedDuration = formatDuration(
              this.totalDuration,
              period,
              this.periods[period]
            )
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
    formatDurationParts,
    initModel () {
      this.model = { ...this.value }
    },
    emitModel () {
      this.$emit('input', this.model)
    }
  }
})
</script>

<style lang="scss" scoped>
.toggle-checkbox:checked {
  right: 0;
}
</style>
