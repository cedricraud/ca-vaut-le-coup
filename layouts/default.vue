<template>
  <div>
    <header class="p-6 text-center">
      <h1>
        Ça vaut le coup ?
      </h1>
      <p class="my-4 leading-snug text-pink-900">
        Un calculateur de temps gagné<br>
        pour comprendre la puissance des effets cumulés.
      </p>
    </header>
    <Nuxt />
  </div>
</template>

<style lang="postcss">
html,
body {
  @apply bg-pink-100 p-2;

  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

h1 {
  @apply text-3xl font-semibold text-pink-900;
}

h2 {
  @apply text-lg font-semibold mb-2 text-pink-900;
}

textarea,
input,
select {
  @apply px-4 py-2 leading-tight border-2 border-blue-300 rounded;

  &:focus {
    @apply outline-none bg-white border-pink-400;
  }
}

textarea {
  @apply w-full;
}

input {
  @apply w-20;
}

select {
  @apply block w-full appearance-none;
}

.select-container {
  @apply relative inline-block
}
</style>
