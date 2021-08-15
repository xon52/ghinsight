<template>
  <!-- Loading -->
  <working-modal v-if="isWorking" />
  <!-- Content -->
  <div v-else>
    <user-panel />
    <org-panel />
    <member-panel />
    <teams-panel />
    <repo-panel />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { githubStore } from '@/stores'
import { WorkingModal, UserPanel, OrgPanel, MemberPanel, TeamsPanel, RepoPanel } from '@/components'

export default defineComponent({
  components: { WorkingModal, UserPanel, OrgPanel, MemberPanel, TeamsPanel, RepoPanel },
  name: 'PageDashboard',
  setup() {
    const isWorking = computed(() => githubStore.working.value?.length)
    const workingText = computed(() => githubStore.working.value)

    return { isWorking, workingText }
  },
})
</script>
