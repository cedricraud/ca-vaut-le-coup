<template>
  <form
    class="grid max-w-screen-lg grid-cols-1 gap-6 mx-auto md:grid-cols-8"
    name="cvlc"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
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
    <input type="hidden" name="form-name" value="cvlc">
    <input type="hidden" name="url">
  </form>
</template>

<script lang="js">
import Vue from 'vue'
import { computeDuration, computeProfitableDuration, initPath, generatePath } from '@/utils/duration.ts'

export default Vue.extend({
  data () {
    return {
      model: {
        'form-name': 'cvlc',
        task: '',
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
    if (process.client) {
      Object.assign(this.model, initPath(location.pathname))
    }
    this.computeDuration(false)
  },
  methods: {
    computeDuration (updatePath) {
      this.totalDuration = computeDuration(this.model)
      this.profitableDuration = computeProfitableDuration(this.model)

      if (updatePath && process.client) {
        const path = generatePath(this.model)
        window.history.pushState({}, '', path)
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
