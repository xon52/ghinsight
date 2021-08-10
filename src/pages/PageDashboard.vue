<template>
  <!-- Loading -->
  <working-modal v-if="isWorking" />
  <!-- Content -->
  <div v-else>
    <Toolbar> </Toolbar>
    <h1>Dashboard</h1>
    <h3>User</h3>
    <p>{{ JSON.stringify(ghUser) }}</p>
    <h3>Org</h3>
    <p>{{ JSON.stringify(ghOrg) }}</p>
    <h3>Members</h3>
    <p>{{ JSON.stringify(ghMembers) }}</p>
    <h3>PublicMembers</h3>
    <p>{{ JSON.stringify(ghPublicMembers) }}</p>
    <h3>Teams</h3>
    <p>{{ JSON.stringify(ghTeams) }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { githubStore } from '@/stores'
import WorkingModal from '@/components/WorkingModal.vue'

export default defineComponent({
  components: { WorkingModal },
  name: 'PageDashboard',
  setup() {
    const isWorking = computed(() => githubStore.working.value?.length)
    const workingText = computed(() => githubStore.working.value)
    const ghUser = githubStore.user
    const ghOrg = githubStore.org
    const ghMembers = githubStore.members
    const ghPublicMembers = githubStore.publicMembers
    const ghTeams = githubStore.teams

    return { isWorking, workingText, ghUser, ghOrg, ghMembers, ghPublicMembers, ghTeams }
  },
})
</script>
