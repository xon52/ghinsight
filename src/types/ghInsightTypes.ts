export type GHInsightUser = {
  login: string
  id: number
}

export type GHInsightOrg = {
  login: string
  id: number
  description: string
  name: string
  company: string
}

export type GHInsightTeam = {
  id: number
  name: string
  slug: string
  description?: string
  parent?: GHInsightTeam
}

export type GHInsightRepo = {
  id: number
  name: string
  description: string
  archived: boolean
  updated_at: string
  language: string
}

export type GHInsightPull = {
  url: string
  id: number
  number: number
  state: string
  locked: boolean
  title: string
  user: GHInsightUser
  body: string
  created_at: string
  updated_at: string
  closed_at: string
  merged_at: string
  requested_reviewers: GHInsightUser[]
  requested_teams: GHInsightTeam[]
  draft: boolean
  repo: string
}
