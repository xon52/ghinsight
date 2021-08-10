import { GithubOrg, GithubRateLimit, GithubTeam, GithubUser, GithubUserOrg } from '@/types/githubTypes'

let _auth: string | undefined = undefined
let _org: string | undefined = undefined
const _base = `https://api.github.com`
const _maxCycles = 3

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
    console.log('response', response)
    const data = await response.json()
    if (!ok) throw new Error(data.message)
    if (!data) throw new Error('No data returned')
    return data
  } catch (error) {
    throw error
  }
}
const cycleFetch = async (url: string, params: Record<string, any> = {}) => {
  if (!params.per_page) params.per_page = 100
  let result: any[] = []
  for (let i = 1, j = 0; i < _maxCycles && j < 1; i++) {
    params.page = i
    const temp = await goFetch(url, params)
    result = [...result, ...temp]
    if (result.length < params._per_page) j++
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
export const getMe = async () => (await goFetch(`/user`)) as GithubUser
export const getUser = async (user?: string) => (await goFetch(`/users/${user}`)) as GithubUser
// Orgs
export const getOrg = async () => (await goFetch(`/orgs/${_org}`)) as GithubOrg
export const getOrgMembers = async () => (await cycleFetch(`/orgs/${_org}/members`)) as GithubUser[]
export const getOrgPublicMembers = async () => (await cycleFetch(`/orgs/${_org}/public_members`)) as GithubUser[]
export const getOrgTeams = async () => (await cycleFetch(`/orgs/${_org}/teams`)) as GithubTeam[]
// Repos

// Pulls
// https://github.com/octokit/plugin-rest-endpoint-methods.js/blob/master/src/generated/endpoints.ts#L854
