<script setup lang="ts"></script>

<template>
  <div class="flex flex-col">
    <div
      class="main-container relative flex-1 bg-kanadeLight text-kanadeDark dark:bg-kanadeDark dark:text-kanadeLight"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 40vh;
  color: var(--text);
  background: var(--bg);
  transition:
    background-color 0.3s ease-in-out,
    color 0.3s ease-in-out;
}
</style>
