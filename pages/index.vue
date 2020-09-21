<template>
  <div class="grid max-w-screen-lg grid-cols-1 gap-6 mx-auto md:grid-cols-8">
    <Form
      v-model="model"
      class="box md:col-span-3"
      @input="computeDuration"
    />
    <Result
      v-model="model"
      class="box md:col-span-5"
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
        horizonPeriod: 'years',
        isWorkingPeriod: false
      },
      totalDuration: { seconds: 0 }
    }
  },
  created () {
    this.computeDuration()
  },
  methods: {
    getDuration (value:number, period:string) {
      return { [period]: value }
    },
    durationToUnit (duration:any, unit:string) {
      return durationToUnit(duration, unit, 1, new Date())
    },
    computeDurations () {
      const { gainValue, gainPeriod, frequencyValue, frequencyPeriod, horizonValue, isWorkingPeriod } = this.model
      const durationSeconds = this.durationToUnit(this.getDuration(gainValue, gainPeriod), 'seconds')
      let frequencyYearlyDays = 365 / this.durationToUnit(this.getDuration(1, frequencyPeriod), 'days')
      if (isWorkingPeriod && frequencyPeriod !== 'years') {
        // Theoritical working days per year (https://www.juristique.org/social/duree-du-travail#Calcul_de_la_duree_du_travail_legale_annuelle_base_35H00)
        frequencyYearlyDays = 228 / this.durationToUnit(this.getDuration(1, frequencyPeriod), 'days')
      }
      const frequencyDays = frequencyValue * frequencyYearlyDays
      const totalYearlySeconds = durationSeconds * frequencyDays
      const totalSeconds = totalYearlySeconds * horizonValue

      this.totalDuration = { seconds: totalSeconds }
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
