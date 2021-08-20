import { GHInsightOrg, GHInsightRepo, GHInsightTeam, GHInsightUser } from '@/types/ghInsightTypes'
import { GithubOrg, GithubRateLimit, GithubTeam, GithubUser, GithubUserOrg, GithubRepo } from '@/types/githubTypes'

let _auth: string | undefined = undefined
let _org: string | undefined = undefined
const _base = `https://api.github.com`
const _maxCycles = 20

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
  filter: (e: T) => U = (e: T) => e as unknown as U
) => {
  if (!params.per_page) params.per_page = 100
  let result: U[] = []
  for (let i = 1, j = 0; i < _maxCycles && j < 1; i++) {
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
export const getMe = async (filter: (e: GithubUser) => GHInsightUser) => filter(await goFetch(`/user`))
export const getUser = async (user: string, filter: (e: GithubUser) => GHInsightUser) =>
  filter(await goFetch(`/users/${user}`))
// Orgs
export const getOrg = async (filter: (e: GithubOrg) => GHInsightOrg) => filter(await goFetch(`/orgs/${_org}`))
export const getOrgMembers = async (filter: (e: GithubUser) => GHInsightUser) =>
  await cycleFetch<GithubUser, GHInsightUser>(`/orgs/${_org}/members`, undefined, filter)
export const getOrgTeams = async (filter: (e: GithubTeam) => GHInsightTeam) =>
  await cycleFetch<GithubTeam, GHInsightTeam>(`/orgs/${_org}/teams`, undefined, filter)
export const getOrgRepos = async (filter: (e: GithubRepo) => GHInsightRepo) =>
  await cycleFetch<GithubRepo, GHInsightRepo>(`/orgs/${_org}/repos`, { sort: 'pushed' }, filter)
// Repos

// Pulls
// https://github.com/octokit/plugin-rest-endpoint-methods.js/blob/master/src/generated/endpoints.ts#L854
