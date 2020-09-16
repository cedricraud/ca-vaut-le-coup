<template>
  <div>
    <header class="p-6 text-center">
      <h1>
        <div>Ça vaut</div>
        <div>le coup&nbsp;?</div>
      </h1>
      <div class="mt-6 text-lg leading-snug text-blue-900">
        <!-- <em>«&nbsp;Les petits ruisseaux font les grandes rivières.&nbsp;»</em> -->
        <p>
          Un calculateur de temps gagné pour comprendre<br>
          que les petits ruisseaux font les grandes rivières.
        </p>
      </div>
    </header>
    <Nuxt />
  </div>
</template>

<style lang="scss">
html,
body {
  @apply p-2;
  background: #eaf0f5; /* jonathanlefevre.com's blue is #C0D0E0 */
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
  box-shadow: 1px 1px 0 rgba(#c0d0e0, 0.5), 5px 6px 0 rgba(#c0d0e0, 0.3);
}

.duration-label {
  @apply tracking-tight tabular-nums;
}
</style>
