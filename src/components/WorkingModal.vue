<template>
  <Dialog
    :visible="true"
    class="m-2 text-center w-30rem"
    :draggable="false"
    :closable="false"
    modal
    :header="`${working}...`"
  >
    <ProgressSpinner />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { githubStore } from '@/stores'

export default defineComponent({
  name: 'WorkingModal',
  setup() {
    const working = githubStore.working
    return { working }
  },
})
</script>
