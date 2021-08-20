import { ref } from 'vue'
import { idb } from '@/utils/helpers'
import { github } from '@/scripts'
import { GHInsightUser, GHInsightOrg, GHInsightTeam, GHInsightRepo } from '@/types/ghInsightTypes'
import { GithubOrg, GithubUser } from '@/types/githubTypes'

// State
const state = {
  working: ref<string>(),
  user: ref<GHInsightUser>(),
  userStatus: ref('No data'),
  org: ref<GHInsightOrg>(),
  orgStatus: ref('No data'),
  members: ref<GHInsightUser[]>([]),
  membersStatus: ref('No data'),
  teams: ref<GHInsightTeam[]>([]),
  teamsStatus: ref('No data'),
  repos: ref<GHInsightRepo[]>([]),
  reposStatus: ref('No data'),
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
    state.userStatus.value = 'Loading...'
    return github
      .getMe((r: GithubUser) => ({
        id: r.id,
        login: r.login,
        site_admin: r.site_admin,
      }))
      .then((result) => {
        state.userStatus.value = ''
        idb.set('gh_user', result)
        return result
      })
      .catch((e) => (state.userStatus.value = `ERROR :: ${e.message}`))
  },
  fetchOrg: async () => {
    state.orgStatus.value = 'Loading...'
    return github
      .getOrg((r: GithubOrg) => ({
        company: r.company,
        description: r.description,
        id: r.id,
        login: r.login,
        name: r.name,
      }))
      .then((result) => {
        state.orgStatus.value = ''
        idb.set('gh_org', result)
        return result
      })
      .catch((e) => (state.orgStatus.value = `ERROR :: ${e.message}`))
  },
  fetchMembers: async () => {
    state.membersStatus.value = 'Loading...'
    return github
      .getOrgMembers((r: GithubUser) => ({
        id: r.id,
        login: r.login,
        site_admin: r.site_admin,
      }))
      .then((result) => {
        state.membersStatus.value = ''
        idb.set('gh_members', result)
        return result
      })
      .catch((e) => (state.membersStatus.value = `ERROR :: ${e.message}`))
  },
  fetchTeams: async () => {
    state.teamsStatus.value = 'Loading...'
    return github
      .getOrgTeams((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        description: r.description,
        parent: r.parent?.id || null,
      }))
      .then((result) => {
        state.teamsStatus.value = ''
        idb.set('gh_teams', result)
        return result
      })
      .catch((e) => (state.teamsStatus.value = `ERROR :: ${e.message}`))
  },
  fetchRepos: async () => {
    state.reposStatus.value = 'Loading...'
    return github
      .getOrgRepos((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        archived: r.archived,
        updated_at: r.updated_at,
      }))
      .then((result) => {
        state.reposStatus.value = ''
        idb.set('gh_repos', result)
        return result
      })
      .catch((e) => (state.reposStatus.value = `ERROR :: ${e.message}`))
  },
}

export default { ...state, ...getters, ...actions }
