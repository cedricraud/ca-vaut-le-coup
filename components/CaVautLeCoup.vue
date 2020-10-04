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
      :profitable-duration="profitableDuration"
      @input="computeDuration"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { computeDuration, computeProfitableDuration } from '@/utils/duration'

export default Vue.extend({
  data () {
    return {
      model: {
        durationValue: 15,
        durationPeriod: 'seconds',
        amountValue: 5,
        amountPeriod: 'days',
        horizonValue: 5,
        horizonPeriod: 'years',
        optimizationValue: 30,
        optimizationPeriod: 'minutes',
        isWorkingPeriod: false
      },
      totalDuration: { seconds: 0 },
      profitableDuration: { seconds: 0 }
    }
  },
  created () {
    this.computeDuration()
  },
  methods: {
    computeDuration () {
      this.totalDuration = computeDuration(this.model)
      // @ts-ignore
      this.profitableDuration = computeProfitableDuration(this.model)
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
