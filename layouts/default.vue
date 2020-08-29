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
@import url(https://rsms.me/inter/inter.css);

html,
body {
  @apply bg-pink-100 bg-opacity-25 p-2;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 15px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

h1 {
  @apply text-3xl font-semibold text-pink-900 tracking-tight;
}

h2 {
  @apply text-lg font-semibold mb-2 text-pink-900 tracking-tight;
}

textarea,
input,
select {
  @apply px-4 py-2 leading-tight border-2 border-gray-400 rounded transition-all duration-200;

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
