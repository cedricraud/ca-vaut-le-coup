<template>
  <div class="grid max-w-screen-lg grid-cols-1 gap-4 mx-auto md:grid-cols-8">
    <Form
      v-model="model"
      class="p-3 pb-6 bg-white border-2 border-pink-200 rounded md:col-span-3"
      @input="computeDuration"
    />
    <Result
      v-model="model"
      class="p-3 pb-6 bg-white border-2 border-pink-200 rounded md:col-span-5"
      :total-duration="totalDuration"
      @input="computeDuration"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { durationToUnit } from '@ryki/datemath'

export default Vue.extend({
  data () {
    return {
      model: {
        gainValue: 15,
        gainPeriod: 'seconds',
        frequencyValue: 3,
        frequencyPeriod: 'days',
        horizonValue: 1,
        horizonPeriod: 'years'
      },
      totalDuration: { seconds: 0 }
    }
  },
  mounted () {
    this.computeDuration()
  },
  methods: {
    getDuration (value:number, period:string) {
      return { [period]: value }
    },
    computeDuration () {
      const { gainValue, gainPeriod, frequencyValue, frequencyPeriod, horizonValue } = this.model
      const durationSeconds = durationToUnit(this.getDuration(gainValue, gainPeriod), 'seconds')
      const frequencyDays = frequencyValue * 365 / durationToUnit(this.getDuration(1, frequencyPeriod), 'days')
      const totalYearlySeconds = durationSeconds * frequencyDays
      const totalSeconds = totalYearlySeconds * horizonValue
      this.totalDuration = { seconds: totalSeconds }
      console.log(durationSeconds, 'seconds', frequencyDays, 'days', totalYearlySeconds, 'seconds spent yearly', totalSeconds, `seconds spent in ${horizonValue} years`)
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
