<template>
  <template-panel :text="`Actions`" to="/u/repos">
    <x-button @click="handleReposClick" :disabled="working || Object.keys(repos).length > 1">Get Repos</x-button>
    <x-button @click="handleCodeOwnersClick" :disabled="working || Object.keys(repos).length < 1">
      Get CodeOwners
    </x-button>
    <x-button @click="handleBuildkiteClick" :disabled="working || Object.keys(repos).length < 1">
      Check has .buildkite
    </x-button>
    <x-button @click="handleExport" :disabled="working || Object.keys(repos).length < 1">Export</x-button>
  </template-panel>
</template>

<script setup lang="ts">
import TemplatePanel from './TemplatePanel.vue'
import { githubStore } from '@/stores'
import { XButton } from '@/utils/components'
import { decodeBase64 } from '@/utils/helpers'
import type { Ref } from 'vue'
import { ref } from 'vue'

type ExportType = {
  name: string
  language: string
  updated_at: string
  teams: string[]
  hasBuildkite: boolean
}

const working = ref(false)
const repos: Ref<Record<string, ExportType>> = ref({})

const handleReposClick = async () => {
  githubStore.repos.value
    .filter((r) => {
      if (r.archived) return false
      return true
    })
    .forEach((r) => {
      repos.value[r.name] = {
        name: r.name,
        language: r.language,
        updated_at: r.updated_at,
        teams: [],
        hasBuildkite: false,
      }
    })
}

const handleCodeOwnersClick = async () => {
  working.value = true
  for (const k in repos.value) {
    const r = repos.value[k]
    githubStore
      .fetchCodeOwners(r.name)
      .then((result) => {
        const codeOwners = decodeBase64(result.content)
        githubStore.teams.value.forEach((t) => {
          if (codeOwners.includes(`/${t.slug}`)) r.teams.push(t.name)
        })
      })
      .catch(() => {})
  }
  working.value = false
}

const handleBuildkiteClick = async () => {
  working.value = true
  for (const k in repos.value) {
    const r = repos.value[k]
    githubStore
      .fetchBuildKite(r.name)
      .then((result) => {
        console.log(`${r.name} hasBuildKite`, !!result)
        r.hasBuildkite = !!result
      })
      .catch(() => {})
  }
  working.value = false
}

const handleExport = async () => {
  working.value = true
  const result = Object.values(repos.value).map(
    (e) =>
      `${e.name},${e.language},${new Date(e.updated_at).toLocaleDateString()},${e.teams.join('|')}, ${
        e.hasBuildkite
      }`
  )
  result.unshift('Name, Language, Updated, CodeOwners, Has .buildkite')
  // CSV maker
  const el = document.createElement('a')
  const csvContent = result.join(`\n`)
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  el.href = url
  el.setAttribute('download', 'services.csv')
  el.click()
  working.value = false
}
</script>
