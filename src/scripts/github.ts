import { GHInsightOrg, GHInsightPull, GHInsightRepo, GHInsightTeam, GHInsightUser } from '@/types/ghInsightTypes'
import {
  GithubOrg,
  GithubRateLimit,
  GithubTeam,
  GithubUser,
  GithubUserOrg,
  GithubRepo,
  GithubPull,
} from '@/types/githubTypes'

type StatusUpdate = (s: string) => void

let _auth: string | undefined = undefined
let _org: string | undefined = undefined
const _base = `https://api.github.com`
const _maxCycles = 20

const applyFilter = <T, U>(target: T, filter: (t: T) => U) => filter(target)
const applyFilterArr = <T, U>(target: T[], filter: (t: T) => U) => target.map((e) => filter(e))

const userFilter: (r: GithubUser) => GHInsightUser = (r) => ({
  id: r.id,
  login: r.login,
})
const orgFilter: (r: GithubOrg) => GHInsightOrg = (r) => ({
  company: r.company,
  description: r.description,
  id: r.id,
  login: r.login,
  name: r.name,
})
const teamFilter: (r: GithubTeam) => GHInsightTeam = (r) => ({
  id: r.id,
  name: r.name,
  slug: r.slug,
  description: r.description,
  parent: r.parent ? applyFilter<GithubTeam, GHInsightTeam>(r.parent, teamFilter) : undefined,
})

const repoFilter: (r: GithubRepo) => GHInsightRepo = (r) => ({
  id: r.id,
  name: r.name,
  description: r.description,
  archived: r.archived,
  updated_at: r.updated_at,
  language: r.language,
  pulls: [],
})
const pullFilter: (r: GithubPull) => GHInsightPull = (r) => ({
  url: r.url,
  id: r.id,
  number: r.number,
  state: r.state,
  locked: r.locked,
  title: r.title,
  user: r.user,
  body: r.body,
  created_at: r.created_at,
  updated_at: r.updated_at,
  closed_at: r.closed_at,
  merged_at: r.merged_at,
  requested_reviewers: r.requested_reviewers,
  requested_teams: applyFilterArr<GithubTeam, GHInsightTeam>(r.requested_teams, teamFilter),
  draft: r.draft,
  repo: r.head.repo.name,
})

// Methods
const genUrl = (url: string, params?: Record<string, any>) => {
  const _url = new URL(_base + url)
  if (params) Object.keys(params).forEach((key) => _url.searchParams.append(key, params[key]))
  return _url.toString()
}
const genOptions = () => ({ headers: { Accept: 'application/vnd.github.v3+json', Authorization: `Token ${_auth}` } })
const goFetch = async (url: string, params?: Record<string, any>) => {
  try {
    const response = await fetch(genUrl(url, params), genOptions())
    const ok = response.ok
    const data = await response.json()
    if (!ok) throw new Error(data.message)
    if (!data) throw new Error('No data returned')
    return data
  } catch (error) {
    throw error
  }
}
const cycleFetch = async <T, U>(
  url: string,
  params: Record<string, any> = {},
  filter: (e: T) => U = (e: T) => e as unknown as U,
  status?: StatusUpdate
) => {
  if (!params.per_page) params.per_page = 100
  let result: U[] = []
  for (let i = 1, j = 0; i < _maxCycles && j < 1; i++) {
    if (status) status(`Fetching page ${i}`)
    params.page = i
    const temp: T[] = await goFetch(url, params)
    result = [...result, ...temp.map(filter)]
    if (result.length <= params._per_page) j++
  }
  return result
}

// https://github.com/octokit/plugin-rest-endpoint-methods.js/blob/master/src/generated/endpoints.ts
export const setup = (auth: string, org: string) => {
  _auth = auth
  _org = org
}
export const check = async () => (await goFetch(`/user/memberships/orgs`)) as GithubUserOrg[]
export const rateLimit = async () => (await goFetch(`/rate_limit`)) as GithubRateLimit
// Users
export const getMe = async () => applyFilter<GithubUser, GHInsightUser>(await goFetch(`/user`), userFilter)
export const getUser = async (user: string) =>
  applyFilter<GithubUser, GHInsightUser>(await goFetch(`/users/${user}`), userFilter)
// Org
export const getOrg = async () => applyFilter<GithubOrg, GHInsightOrg>(await goFetch(`/orgs/${_org}`), orgFilter)
export const getMembers = async (status: StatusUpdate) =>
  await cycleFetch(`/orgs/${_org}/members`, undefined, userFilter, status)
export const getTeams = async (status: StatusUpdate) =>
  await cycleFetch(`/orgs/${_org}/teams`, undefined, teamFilter, status)
// Repos
export const getRepos = async (status: StatusUpdate) =>
  await cycleFetch(`/orgs/${_org}/repos`, { sort: 'updated' }, repoFilter, status)
// Pulls
export const getPulls = async (repo: string, status: StatusUpdate) =>
  await cycleFetch(`/repos/${_org}/${repo}/pulls`, { sort: 'updated' }, pullFilter, status)
// CodeOwners
export const getCodeOwners = async (repo: string, status: StatusUpdate) =>
  await goFetch(`/repos/${_org}/${repo}/contents/.github/CODEOWNERS`, { sort: 'updated' })

// Pulls
// https://github.com/octokit/plugin-rest-endpoint-methods.js/blob/master/src/generated/endpoints.ts#L854
