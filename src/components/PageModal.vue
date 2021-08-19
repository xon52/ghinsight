<template>
  <x-modal :open="_show" :mask-closable="false">
    <x-card :title="_title">
      <slot></slot>
    </x-card>
  </x-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { XModal, XCard } from '@/utils/components'

const props = defineProps({
  show: Boolean,
  title: String,
})

const _show = computed(() => props.show)
const _title = computed(() => props.title)
</script>
