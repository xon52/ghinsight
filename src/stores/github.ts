import { ref } from 'vue'
import { github, idb } from '@/utils/helpers'
import { GHInsightUser, GHInsightOrg, GHInsightTeam, GHInsightRepo } from '@/types/ghInsightTypes'

// State
const state = {
  working: ref<string>(),
  user: ref<GHInsightUser>(),
  org: ref<GHInsightOrg>(),
  members: ref<GHInsightUser[]>([]),
  publicMembers: ref<GHInsightUser[]>([]),
  teams: ref<GHInsightTeam[]>([]),
  repos: ref<GHInsightRepo[]>([]),
}

// Getters
const getters = {}

// Actions
const actions = {
  restore: async () => {
    const [user, org, members, teams, repos] = await idb.getMany([
      'gh_user',
      'gh_org',
      'gh_members',
      'gh_teams',
      'gh_repos',
    ])
    state.user.value = user ? user : await actions.fetchUser()
    state.org.value = org ? org : await actions.fetchOrg()
    state.members.value = members ? members : await actions.fetchMembers()
    state.teams.value = teams ? teams : await actions.fetchTeams()
    state.repos.value = repos ? repos : await actions.fetchRepos()
  },
  fetchUser: async () => {
    const response = await github.getMe()
    const result = {
      id: response.id,
      login: response.login,
      site_admin: response.site_admin,
    }
    idb.set('gh_user', result)
    return result
  },
  fetchOrg: async () => {
    const response = await github.getOrg()
    const result = {
      company: response.company,
      description: response.description,
      id: response.id,
      login: response.login,
      name: response.name,
    }
    idb.set('gh_org', result)
    return result
  },
  fetchMembers: async () => {
    const response = await github.getOrgMembers()
    const result = response.map((r) => ({
      id: r.id,
      login: r.login,
      site_admin: r.site_admin,
    }))
    idb.set('gh_members', result)
    return result
  },
  fetchTeams: async () => {
    const response = await github.getOrgTeams()
    const result = response.map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      description: r.description,
      parent: r.parent?.id || null,
    }))
    idb.set('gh_teams', result)
    return result
  },
  fetchRepos: async () => {
    const response = await github.getOrgRepos()
    const result = response.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      archived: r.archived,
      updated_at: r.updated_at,
    }))
    idb.set('gh_repos', result)
    return result
  },
}

export default { ...state, ...getters, ...actions }
