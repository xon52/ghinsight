<template>
  <div
    class="
      flex flex-col
      m-1
      overflow-hidden
      text-gray-700
      transition-all
      bg-white
      rounded-md
      shadow-md
      sm:m-2
      md:m-3
      lg:m-4
      h-content
    "
  >
    <!-- Header -->
    <div class="z-10 flex justify-between p-3 bg-gray-300">
      <!-- Title -->
      <div class="overflow-hidden truncate overflow-ellipsis">
        <span class="w-5 h-full">
          <slot name="header">{{ title }}</slot>
        </span>
      </div>
      <!-- Icons -->
      <div class="flex h-5 ml-2 text-gray-400 align-middle :hover:bg-purple-700">
        <slot name="icons" />
        <button class="h-full text-gray-400 hover:text-gray-500" @click="toggle">
          <svg-minimize v-if="!collapsed" class="h-full" />
          <svg-maximize v-else class="h-full" />
        </button>
      </div>
    </div>
    <!-- Content -->
    <div
      class="overflow-auto transition-all duration-300 ease-in-out bar"
      :style="`max-height:${collapsed ? '0' : contentMaxHeight + 'px'};`"
    >
      <div ref="content" v-on-resize="updateContentMaxHeight" class="px-3 py-5 sm:px-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { svgMaximize, svgMinimize } from '@/utils/icons'
import { title } from 'process'

defineProps({
  title: { type: String },
})

const collapsed = ref(false)
const content = ref<HTMLElement>()
const contentMaxHeight = ref(-1)

const updateContentMaxHeight = () => (contentMaxHeight.value = content.value?.clientHeight || 0)

const toggle = () => (collapsed.value = !collapsed.value)
</script>
