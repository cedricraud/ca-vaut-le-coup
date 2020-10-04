<template>
  <div>
    <h2>De quelle tâche parle-t-on&nbsp;?</h2>
    <textarea
      v-model="model.task"
      class="placeholder-gray-600"
      placeholder="Ouvrir un fichier avec Alfred plutôt qu'en naviguant dossier par dossier."
      @input="emitModel"
    />

    <h2 class="mt-6 tracking-tightest sm:tracking-tight">
      Combien de temps vous ferait-elle gagner&nbsp;?
    </h2>
    <div class="text-center">
      <input
        v-model.number="model.durationValue"
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
    </div>
    <h2 />

    <h2 class="mt-6">
      Quelle est sa fréquence&nbsp;?
    </h2>
    <div class="text-center">
      <input
        v-model.number="model.amountValue"
        type="number"
        step="1"
        min="1"
        inputmode="numeric"
        pattern="[0-9]*"
        @focus="$event.target.select()"
        @input="emitModel"
      >
      <span class="px-1">fois</span>
      <div class="w-36 select-container">
        <select
          v-model="model.amountPeriod"
          @change="emitModel"
        >
          <option value="days">
            par jour
          </option>
          <option value="weeks">
            par semaine
          </option>
          <option value="months">
            par mois
          </option>
          <option value="years">
            par an
          </option>
          <!-- <option>tous les 10 ans</option> -->
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
