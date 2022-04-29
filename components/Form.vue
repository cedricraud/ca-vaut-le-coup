<template>
  <div>
    <h2 v-t="'form.task.question'" />
    <textarea
      v-model="model.task"
      name="task"
      class="placeholder-gray-600"
      :placeholder="$t('form.task.placeholder')"
      @input="emitModel"
    />

    <h2 v-t="'form.durationValue.question'" class="mt-6 tracking-tightest sm:tracking-tight" />
    <div class="text-center">
      <input
        v-model.number="model.durationValue"
        name="durationValue"
        type="number"
        step="1"
        min="1"
        inputmode="numeric"
        pattern="[0-9]*"
        @focus="$event.target.select()"
        @input="emitModel"
      >
      <div class="w-32 select-container">
        <select
          v-model="model.durationPeriod"
          name="durationPeriod"
          @change="emitModel"
        >
          <option v-t="'duration.seconds'" value="seconds" />
          <option v-t="'duration.minutes'" value="minutes" />
          <option v-t="'duration.hours'" value="hours" />
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
    </div>
    <h2 />

    <h2 v-t="'form.durationPeriod.question'" class="mt-6" />
    <div class="text-center">
      <input
        v-model.number="model.amountValue"
        name="amountValue"
        type="number"
        step="1"
        min="1"
        inputmode="numeric"
        pattern="[0-9]*"
        @focus="$event.target.select()"
        @input="emitModel"
      >
      <span v-t="'period.times'" class="px-1" />
      <div class="w-36 select-container">
        <select
          v-model="model.amountPeriod"
          name="amountPeriod"
          @change="emitModel"
        >
          <option value="days">
            {{ $t('period.per') }} {{ $t('duration.days') }}
          </option>
          <option value="weeks">
            {{ $t('period.per') }} {{ $t('duration.weeks') }}
          </option>
          <option value="months">
            {{ $t('period.per') }} {{ $t('duration.months') }}
          </option>
          <option value="years">
            {{ $t('period.per') }} {{ $t('duration.years') }}
          </option>

          <!-- <option>tous les 10 ans</option> -->
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      model: {}
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
    }
  }
})
</script>

<style lang="postcss" scoped>

</style>
