<template>
  <Panel v-if="members" collapsed toggleable class="p-0 w-20rem">
    <template #header>
      <div>
        <span class="mr-3 text-2xl">Members</span>
        <AvatarGroup class="inline">
          <Avatar v-for="(v, i) in members.slice(0, 6)" :key="i" :image="v.avatar_url" shape="circle" />
        </AvatarGroup>
      </div>
    </template>
    <ScrollPanel style="width: 100%; height: 400px">
      <DataTable :value="members" class="p-datatable-sm p-datatable-striped">
        <Column headerStyle="width: 48px !important;">
          <template #body="{ data }">
            <Avatar :image="data.avatar_url" shape="circle" />
          </template>
        </Column>
        <Column header="Name">
          <template #body="{ data }"> {{ data.login }} </template>
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
    const members = githubStore.members
    return { members }
  },
})
</script>
