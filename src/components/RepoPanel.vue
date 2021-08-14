<template>
  <Panel v-if="repos" collapsed toggleable class="p-0 w-20rem" header="repos">
    <template #header>
      <span class="mr-3 text-2xl">Repos</span>
    </template>
    <ScrollPanel style="width: 100%; height: 400px">
      <DataTable :value="repos" class="p-datatable-sm p-datatable-striped">
        <Column>
          <template #body="{ data }">
            <span :class="{ 'text-gray-300': data.archived }">{{ data.name }}</span>
          </template>
        </Column>
      </DataTable>
    </ScrollPanel>
  </Panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { githubStore } from '@/stores'

export default defineComponent({
  setup() {
    const repos = githubStore.repos
    return { repos }
  },
})
</script>
