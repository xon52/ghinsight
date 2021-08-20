<template>
  <div class="flex flex-col gap-4 p-6 overflow-hidden text-gray-700 align-middle bg-white rounded-md shadow-md">
    <!-- Title -->
    <slot name="title">
      <h1 v-if="title" class="text-2xl font-bold">{{ title }}</h1>
    </slot>
    <!-- SubTitle -->
    <slot name="subtitle">
      <h3 v-if="subtitle" class="text-gray-400 text font">{{ subtitle }}</h3>
    </slot>
    <!-- Content -->
    <div class="my-auto overflow-auto">
      <slot></slot>
    </div>
    <!-- Footer -->
    <slot name="footer"></slot>
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
