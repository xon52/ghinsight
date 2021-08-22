import { ref } from 'vue'
import { idb } from '@/utils/helpers'
import { github } from '@/scripts'
import { GHInsightUser, GHInsightOrg, GHInsightTeam, GHInsightRepo, GHInsightPull } from '@/types/ghInsightTypes'

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
  pulls: ref<Record<string, GHInsightPull[]>>({}),
  pullsStatus: ref('No data'),
  codeOwners: ref<Record<string, string[]>>({}),
  codeOwnersStatus: ref('No data'),
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
    if (user) state.user.value = user
    else actions.fetchUser()
    if (org) state.org.value = org
    else actions.fetchOrg()
    if (members) state.members.value = members
    else actions.fetchMembers()
    if (teams) state.teams.value = teams
    else actions.fetchTeams()
    if (repos) state.repos.value = repos
    else actions.fetchRepos()
  },
  fetchUser: async () => {
    state.userStatus.value = 'Loading...'
    return github
      .getMe()
      .then((result) => {
        state.user.value = result
        state.userStatus.value = ''
        idb.set('gh_user', result)
        return result
      })
      .catch((e) => (state.userStatus.value = `ERROR :: ${e.message}`))
  },
  fetchOrg: async () => {
    state.orgStatus.value = 'Loading...'
    return github
      .getOrg()
      .then((result) => {
        state.org.value = result
        state.orgStatus.value = ''
        idb.set('gh_org', result)
        return result
      })
      .catch((e) => (state.orgStatus.value = `ERROR :: ${e.message}`))
  },
  fetchMembers: async () => {
    state.membersStatus.value = 'Loading...'
    return github
      .getMembers((s) => (state.membersStatus.value = s))
      .then((result) => {
        state.members.value = result
        state.membersStatus.value = ''
        idb.set('gh_members', result)
        return result
      })
      .catch((e) => (state.membersStatus.value = `ERROR :: ${e.message}`))
  },
  fetchTeams: async () => {
    state.teamsStatus.value = 'Loading...'
    return github
      .getTeams((s) => (state.teamsStatus.value = s))
      .then((result) => {
        state.teams.value = result
        state.teamsStatus.value = ''
        idb.set('gh_teams', result)
        return result
      })
      .catch((e) => (state.teamsStatus.value = `ERROR :: ${e.message}`))
  },
  fetchRepos: async () => {
    state.reposStatus.value = 'Loading...'
    return github
      .getRepos((s) => (state.reposStatus.value = s))
      .then((result) => {
        state.repos.value = result
        state.reposStatus.value = ''
        idb.set('gh_repos', result)
        return result
      })
      .catch((e) => (state.reposStatus.value = `ERROR :: ${e.message}`))
  },
  fetchPulls: async (repoName: string) => {
    state.pullsStatus.value = 'Loading...'
    return github
      .getPulls(repoName, (s) => (state.pullsStatus.value = s))
      .then((result) => {
        state.pulls.value[repoName] = result
        state.pullsStatus.value = ''
        idb.set('gh_pulls', state.pulls)
        return result
      })
      .catch((e) => (state.pullsStatus.value = `ERROR :: ${e.message}`))
  },
  fetchCodeOwners: async (repoName: string) => {
    state.codeOwnersStatus.value = 'Loading...'
    return github
      .getCodeOwners(repoName, (s) => (state.codeOwnersStatus.value = s))
      .then((result) => {
        state.codeOwners.value[repoName] = result
        state.codeOwnersStatus.value = ''
        // idb.set('gh_codeOwners', state.codeOwners.value)
        return result
      })
      .catch((e) => (state.codeOwnersStatus.value = `ERROR :: ${e.message}`))
  },
}

export default { ...state, ...getters, ...actions }
