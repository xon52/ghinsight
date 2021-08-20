<template>
  <!-- Content -->
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
    <user-panel />
    <org-panel />
    <teams-panel />
    <member-panel />
    <repo-panel />
  </div>
</template>

<script lang="ts" setup>
import { UserPanel, OrgPanel, MemberPanel, TeamsPanel, RepoPanel } from '@/components'
</script>
