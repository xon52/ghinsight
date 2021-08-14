<template>
  <Panel v-if="teams" collapsed toggleable class="p-0 w-20rem" header="Teams">
    <template #header>
      <span class="mr-3 text-2xl">Teams</span>
    </template>
    <ScrollPanel style="width: 100%; height: 400px">
      <DataTable :value="teams" class="p-datatable-sm p-datatable-striped" >
        <Column>
          <template #body="{ data }"> {{ data.name }} </template>
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
    const teams = githubStore.teams
    return { teams }
  },
})
</script>
