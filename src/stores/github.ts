import { ref } from 'vue'
import { github, idb } from '@/helpers'
import { GithubOrg, GithubTeam, GithubUser } from '@/types/githubTypes'

// State
const state = {
  working: ref<string>(),
  user: ref<GithubUser>(),
  org: ref<GithubOrg>(),
  members: ref<GithubUser[]>([]),
  publicMembers: ref<GithubUser[]>([]),
  teams: ref<GithubTeam[]>([]),
}

// Getters
const getters = {}

// Actions
const actions = {
  restore: async () => {
    const [user, org, members, publicMembers, teams] = await idb.getMany([
      'gh_user',
      'gh_org',
      'gh_members',
      'gh_publicMembers',
      'gh_teams',
    ])
    if (!user) actions.fetchUser()
    if (!org) actions.fetchOrg()
    if (!members) actions.fetchMembers()
    if (!publicMembers) actions.fetchPublicMembers()
    if (!teams) actions.fetchTeams()
  },
  fetchUser: async () => {
    const result = await github.getMe()
    state.user.value = result
    idb.set('gh_user', result)
  },
  fetchOrg: async () => {
    const result = await github.getOrg()
    state.org.value = result
    idb.set('gh_org', result)
  },
  fetchMembers: async () => {
    const result = await github.getOrgMembers()
    state.members.value = result
    idb.set('gh_members', result)
  },
  fetchPublicMembers: async () => {
    const result = await github.getOrgPublicMembers()
    state.publicMembers.value = result
    idb.set('gh_publicMembers', result)
  },
  fetchTeams: async () => {
    const result = await github.getOrgTeams()
    state.teams.value = result
    idb.set('gh_teams', result)
  },
}

export default { ...state, ...getters, ...actions }
