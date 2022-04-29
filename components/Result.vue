<template>
  <div class="small-inputs">
    <h2 v-t="'result.horizon.title'" />
    <div>
      {{ $t('result.horizon.intro1') }}
      <div class="w-24 select-container">
        <select
          v-model.number="model.horizonValue"
          name="horizonValue"
          class="py-1 mb-1 sm:mb-0 sm:py-2"
          @change="emitModel"
        >
          <option value="1">
            1 {{ formatPeriod($i18n, 'years', 1) }}
          </option>
          <option value="2">
            2 {{ formatPeriod($i18n, 'years', 2) }}
          </option>
          <option value="3">
            3 {{ formatPeriod($i18n, 'years', 2) }}
          </option>
          <option value="4">
            4 {{ formatPeriod($i18n, 'years', 2) }}
          </option>
          <option value="5">
            5 {{ formatPeriod($i18n, 'years', 2) }}
          </option>
          <option value="10">
            10 {{ formatPeriod($i18n, 'years', 2) }}
          </option>
          <!-- <option>Autre…</option> -->
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {{ $t('result.horizon.intro2') }}
    </div>
    <div class="text-center">
      <div
        class="inline-flex items-center mt-4 mb-1 text-gray-700"
      >
        <label v-t="'result.horizon.lifeTime'" />
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
          v-t="'result.horizon.workTime'"
          class="cursor-help"
          title="Le temps de travail est une estimation sur la base d’une semaine de 35 heures avec 5 semaines de congés par an."
        />
      </div>
      <div class="mt-4 text-3xl font-semibold text-blue-600 duration-label">
        {{ formattedDuration }}
      </div>
      <div v-if="visiblePeriods.length" class="grid items-center grid-cols-2 gap-6 mt-4 -ml-32 text-lg">
        <div v-t="'result.horizon.or'" class="text-right" />
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
        class="mt-4 text-gray-700 duration-label cursor-help"
        :title="$t('result.horizon.jokingTime')"
      >
        {{ $t('result.horizon.jokes1') }} {{ formattedJokes }} {{ $t('result.horizon.jokes3') }}
      </div>
    </div>

    <h2 v-t="'result.optimization.title'" class="mt-6" />
    <!-- <div class="text-gray-700">
      Au bout de combien de temps gagnez-vous à mettre en place cette optimisation&nbsp;? -> Mauvaise question
      Si l'optimisation vous prend X temps, en combien de temps serez-vous gagnant ?
    </div> -->
    <div class="mt-2">
      {{ $t('result.optimization.intro1') }}
      <div class="inline-block whitespace-no-wrap">
        <input
          v-model.number="model.optimizationValue"
          name="optimizationValue"
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
            name="optimizationPeriod"
            class="py-1 my-1 sm:py-2 sm:my-0 sm:mb-1"
            @change="emitModel"
          >
            <option value="seconds">
              {{ formatPeriod($i18n, 'seconds', 2) }}
            </option>
            <option value="minutes">
              {{ formatPeriod($i18n, 'minutes', 2) }}
            </option>
            <option value="hours">
              {{ formatPeriod($i18n, 'hours', 2) }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
            <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      {{ $t('result.optimization.intro2') }}

      <ProfitableGraph :model="model" />

      <div class="text-center">
        <button
          type="button"
          class="px-6 py-2 mx-auto mt-4 text-sm font-bold text-white uppercase bg-blue-600 border-b-4 border-blue-700 rounded focus:outline-none hover:bg-blue-500 hover:border-blue-600"
          @click="share()"
        >
          <template v-if="!isCopySuccess">
            {{ $t('result.share.action') }}
            <svg
              class="inline-block ml-1 -mr-1"
              width="14"
              height="14"
              viewBox="0 0 20 20"
            >
              <path d="M326.612,185.391c59.747,59.809 58.927,155.698 0.36,214.59c-0.11,0.12 -0.24,0.25 -0.36,0.37l-67.2,67.2c-59.27,59.27 -155.699,59.262 -214.96,0c-59.27,-59.26 -59.27,-155.7 0,-214.96l37.106,-37.106c9.84,-9.84 26.786,-3.3 27.294,10.606c0.648,17.722 3.826,35.527 9.69,52.721c1.986,5.822 0.567,12.262 -3.783,16.612l-13.087,13.087c-28.026,28.026 -28.905,73.66 -1.155,101.96c28.024,28.579 74.086,28.749 102.325,0.51l67.2,-67.19c28.191,-28.191 28.073,-73.757 0,-101.83c-3.701,-3.694 -7.429,-6.564 -10.341,-8.569l-1.11781e-06,-7.67599e-07c-4.1772,-2.86848 -6.75296,-7.54245 -6.947,-12.606c-0.396,-10.567 3.348,-21.456 11.698,-29.806l21.054,-21.055c5.521,-5.521 14.182,-6.199 20.584,-1.731l-7.04334e-06,-4.91815e-06c7.33169,5.11949 14.1988,10.874 20.522,17.197Zm140.935,-140.942c-59.261,-59.262 -155.69,-59.27 -214.96,0l-67.2,67.2c-0.12,0.12 -0.25,0.25 -0.36,0.37c-58.566,58.892 -59.387,154.781 0.36,214.59l-7.58096e-06,-7.58084e-06c6.32281,6.32271 13.1896,12.0769 20.521,17.196c6.402,4.468 15.064,3.789 20.584,-1.731l21.054,-21.055c8.35,-8.35 12.094,-19.239 11.698,-29.806l-1.31582e-07,-3.4337e-06c-0.194039,-5.06355 -2.7698,-9.73752 -6.947,-12.606c-2.912,-2.005 -6.64,-4.875 -10.341,-8.569c-28.073,-28.073 -28.191,-73.639 0,-101.83l67.2,-67.19c28.239,-28.239 74.3,-28.069 102.325,0.51c27.75,28.3 26.872,73.934 -1.155,101.96l-13.087,13.087c-4.35,4.35 -5.769,10.79 -3.783,16.612c5.864,17.194 9.042,34.999 9.69,52.721c0.509,13.906 17.454,20.446 27.294,10.606l37.106,-37.106c59.271,-59.259 59.271,-155.699 0.001,-214.959Z" transform="scale(0.0390625)" fill="#FFF" />
            </svg>
          </template>
          <template v-else>
            {{ $t('result.share.success') }}
            <svg
              class="inline-block ml-1 -mr-1"
              width="17"
              height="18"
              viewBox="0 0 20 20"
            >
              <g transform="scale(0.833333)">
                <path fill="none" d="M0,0.001h24v24h-24Z" />
                <path fill="#FFF" d="M12.042,2c-5.523,0 -10,4.477 -10,10c0,5.523 4.477,10 10,10c5.523,0 10,-4.477 10,-10c0,-5.523 -4.478,-10 -10,-10Zm-0.75,15.75l-5,-3.75l1.5,-2l3,2.25l5.25,-7l2,1.5l-6.75,9Z" />
              </g>
            </svg>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from 'vue'
import copy from 'copy-to-clipboard'
import {
  convertDuration,
  isDurationSignificant,
  formatDuration,
  formatPeriod,
  formatDurationParts,
  getPeriods
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
      model: {},
      isCopySuccess: false
    }
  },
  computed: {
    periods () {
      return getPeriods(this.$i18n)
    },
    visiblePeriods () {
      return Object.keys(this.periods).reduce((memo, period) => {
        const name = this.periods[period]
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
      const name = this.$t('result.horizon.jokes2')
      return `${duration.toLocaleString()} ${name}${
        duration > 1 && name[name.length - 1] !== 's' ? 's' : ''
      }`
    },
    formattedProfitableDuration () {
      const profitableDuration = this.profitableDuration
      const period = Object.keys(profitableDuration)[0]
      const name = this.periods[period]
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
    formatPeriod,
    formatDurationParts,
    initModel () {
      this.isCopySuccess = false
      this.model = { ...this.value }
    },
    emitModel () {
      this.$emit('input', this.model)
    },
    async share () {
      // Copy to clipboard
      const url = location.href
      const title = document.title
      try {
        // Use native share sheet on mobile
        await navigator.share({ url, title })
      } catch (e) {
        // Fallback on clipboard
        copy(url)
        this.isCopySuccess = true
      }
      // Send tracking to Fathom
      window.fathom && window.fathom.trackPageview()
      // Send form to Netlify
      const data = { ...this.model, url: location.href }
      this.$axios.$post(
        location.origin + '/',
        Object.keys(data)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
          .join('&'),
        {
          header: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.toggle-checkbox:checked {
  right: 0;
}
</style>
