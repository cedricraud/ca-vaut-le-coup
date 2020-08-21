<template>
  <div>
    <h2>Temps gagné</h2>
    <div>
      Sur un horizon de
      <div class="w-auto select-container">
        <select
          v-model="model.frequencyValue"
        >
          <option>1 an</option>
          <option>2 ans</option>
          <option>3 ans</option>
          <option>4 ans</option>
          <option>5 ans</option>
          <option>10 ans</option>
          <option>Autre…</option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      , cette optimisation vous fera gagner :
    </div>
    <div class="text-center">
      <div class="inline-flex items-center mt-2 text-sm text-gray-700">
        <label>Temps de travail</label>
        <div class="relative inline-block w-10 mx-2 align-middle transition duration-200 ease-in select-none">
          <input id="toggle" type="checkbox" name="toggle" class="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox">
          <label for="toggle" class="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label" />
        </div>
        <label>Temps de vie</label>
      </div>
      <div class="mt-4 text-xl font-semibold tracking-tight text-blue-600">
        165 000 secondes.
      </div>
      <div class="grid items-center grid-cols-2 gap-6 mt-6 -ml-6 text-lg font-medium">
        <div class="text-right">
          Soit
        </div>
        <div class="text-left">
          2750 minutes<br>
          45 heures<br>
          1,9 jour<br>
          0,27 semaine<br>
          0,06 mois<br>
        </div>
      </div>
      <div class="mt-2">
        (Ou le temps pour raconter <span class="text-lg font-medium">11 000</span> blagues de qualité discutable.)
      </div>
    </div>

    <h2 class="mt-6 mb-0">
      Seuil de rentabilité
    </h2>
    <div class="text-gray-700">
      Au bout de combien de temps est-il rentable de mettre en place cette optimisation ?
    </div>
    <div class="mt-2">
      Sur un horizon de
      <div class="w-auto select-container">
        <select
          v-model="model.frequencyValue"
        >
          <option>1 an</option>
          <option>2 ans</option>
          <option>3 ans</option>
          <option>4 ans</option>
          <option>5 ans</option>
          <option>10 ans</option>
          <option>Autre…</option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      , vous serez gagnant si cette optimisation vous prend moins de <span class="text-xl font-semibold tracking-tight text-blue-600">21 heures</span> à mettre en place.
    </div>
    <div class="grid items-center grid-cols-2 gap-6 mt-6 -ml-6 text-lg font-medium">
      <div class="text-right">
        Soit
      </div>
      <div class="text-left">
        1260 minutes<br>
        3 jours de travail<br>
        0,75 jour de vie<br>
        0,27 semaine<br>
        0,06 mois<br>
      </div>
    </div>
    <img class="mx-auto mt-8 mb-2 border-2 border-blue-400 rounded-lg" src="https://dummyimage.com/350x200/fff/aaa">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      model: {
        frequencyValue: '5 ans'
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
/* @apply rules for documentation, these do not work as inline style */
.toggle-checkbox:checked {
  right: 0;
  /* @apply: right-0 border-green-400;
  border-color: #68D391; */
}
.toggle-checkbox:checked + .toggle-label {
  /* @apply: bg-green-400;
  background-color: #68D391; */
}
</style>
