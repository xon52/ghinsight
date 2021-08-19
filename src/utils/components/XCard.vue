<template>
  <div class="overflow-hidden text-gray-700 bg-white rounded-md shadow-md">
    <!-- Header -->
    <slot name="header" />
    <div class="flex flex-col px-3 py-5 space-y-2 sm:px-5">
      <!-- Title -->
      <slot name="title">
        <h1 v-if="title" class="text-2xl font-bold">{{ title }}</h1>
      </slot>
      <!-- SubTitle -->
      <slot name="subtitle">
        <h3 v-if="subtitle" class="text-gray-400 text font">{{ subtitle }}</h3>
      </slot>
      <!-- Content -->
      <div class="my-2 overflow-auto">
        <slot />
      </div>
      <!-- Footer -->
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'XCard',
  props: {
    title: { type: String },
    subtitle: { type: String },
  },
  setup() {},
})
</script>
