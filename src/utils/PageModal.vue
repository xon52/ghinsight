<template>
  <n-modal :show="_show" :mask-closable="false">
    <n-card style="width: 600px" :title="_title" size="huge">
      <slot></slot>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NModal, NCard } from 'naive-ui'

const props = defineProps({
  show: Boolean,
  title: String,
})

const _show = computed(() => props.show)
const _title = computed(() => props.title)
</script>
