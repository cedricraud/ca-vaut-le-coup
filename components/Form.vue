<template>
  <div>
    <h2>De quelle tâche parle-t-on ?</h2>
    <textarea
      class="placeholder-gray-800"
      placeholder="Ouvrir un fichier avec Alfred plutôt qu'en naviguant dossier par dossier."
    />

    <h2 class="mt-6">
      Combien de temps vous fait-elle gagner ?
    </h2>
    <input
      class=""
      type="number"
      step="1"
      min="0"
      :value="model.gainValue"
    >
    <div class="relative inline-block w-48">
      <select
        v-model="model.gainPeriod"
      >
        <option>secondes</option>
        <option>minutes</option>
        <option>heures</option>
        <option>jours</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
    <h2 />

    <h2 class="mt-6">
      Quelle est sa fréquence ?
    </h2>
    <input
      class=""
      type="number"
      step="1"
      min="0"
      :value="model.frequencyValue"
    >
    <span class="px-1">fois</span>
    <div class="select-container">
      <select
        v-model="model.frequencyPeriod"
      >
        <option>par jour</option>
        <option>par semaine</option>
        <option>par mois</option>
        <option>par an</option>
        <option>tous les 10 ans</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
    <h2 />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      model: {
        gainValue: 15,
        gainPeriod: 'secondes',
        frequencyValue: 2,
        frequencyPeriod: 'par jour'
      }
    }
  }
})
</script>

<style lang="postcss" scoped>

</style>
