<template>
  <div v-if="open" :class="`fixed w-full h-full top-0 left-0 flex items-center justify-center`">
    <div class="absolute w-full h-full transition-opacity duration-500 bg-gray-900 opacity-50"></div>
    <div class="z-10 flex justify-center w-full m-auto align-middle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  open: Boolean,
})
</script>
