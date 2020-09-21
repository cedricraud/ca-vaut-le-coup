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
import { computeDuration } from '@/utils/duration'

export default Vue.extend({
  data () {
    return {
      model: {
        gainValue: 15,
        gainPeriod: 'seconds',
        frequencyValue: 5,
        frequencyPeriod: 'days',
        horizonValue: 5,
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
    computeDuration () {
      this.totalDuration = computeDuration(this.model)
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
