<template>
  <div>
    <header class="p-6 text-center">
      <h1>
        <div>Ça vaut</div>
        <div>le coup&nbsp;?</div>
      </h1>
      <div class="mt-6 text-lg text-blue-900">
        Un calculateur de temps gagné pour comprendre<br>
        que les petits ruisseaux font les grandes rivières.
      </div>
    </header>
    <Nuxt />
    <footer class="p-6 text-center text-gray-600">
      Conçu par
      <a target="_blank" href="https://jonathanlefevre.com">Jonathan Lefèvre</a>
      et
      <a target="_blank" href="https://twitter.com/CedricRaud">Cédric Raud</a>,
      inspiré par
      <a target="_blank" href="https://xkcd.com/1205/">XKCD</a>.
    </footer>
  </div>
</template>

<style lang="scss">
html,
body {
  @apply p-2 h-full;
  background: #eaf0f5; /* jonathanlefevre.com's blue is #C0D0E0 */
  background: linear-gradient(to bottom, #eaf0f5, #dde6ee);
  background-attachment: fixed;
  // heropatterns.com's Wiggle
  // background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23bfd3e3' fill-opacity='0.23' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 15px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

h1 {
  font-family: "Rubik", sans-serif;
  @apply text-5xl font-bold text-blue-800 tracking-tight mb-6;
  text-shadow: 1px 1px 0 lighten(#c0d0e0, 0), 2px 2px 0 lighten(#c0d0e0, 2),
    3px 3px 0 lighten(#c0d0e0, 4), 4px 4px 0 lighten(#c0d0e0, 6),
    5px 5px 0 lighten(#c0d0e0, 8), 6px 6px 0 lighten(#c0d0e0, 10);

  margin-left: -55px;
  line-height: 40px;

  div {
    transform: rotate(-3deg);

    &:last-child {
      margin-left: 118px;
    }
  }
}

h2 {
  font-family: "Rubik", sans-serif;
  @apply text-lg font-medium mb-2 text-blue-800 tracking-tight;
}

textarea,
input,
select {
  @apply px-4 py-2 leading-tight border-2 border-gray-500 rounded transition-all duration-200;

  &:focus {
    @apply outline-none bg-white border-indigo-400;
  }
}

a {
  @apply inline-block border-gray-500 border-b leading-tight;

  &:hover {
    @apply text-blue-600 border-blue-500;
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
  @apply relative inline-block;
}

.box {
  @apply p-3 pb-6 bg-white rounded-lg;
  box-shadow: 1px 1px 0 rgba(#c0d0e0, 0.6), 5px 6px 0 rgba(#c0d0e0, 0.4);
}

.duration-label {
  @apply tracking-tight tabular-nums;
}
</style>
