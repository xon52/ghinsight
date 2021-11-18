<template>
  <nav>
    <!-- Left -->
    <div></div>
    <!-- Middle -->
    <div></div>
    <!-- End -->
    <div>
      <button @click="handleRefresh">Refresh</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { githubStore } from '@/stores'

const handleRefresh = () => githubStore.refresh()
</script>

<style lang="scss">
nav {
  color: white;
  display: flex;
  justify-content: space-between;
  background-color: darkgrey;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  button {
    background-color: dodgerblue;
    padding: 5px 10px;
  }
}
</style>
