export type GHInsightUser = {
  login: string
  id: number
  site_admin: boolean
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
  description: string
  parent: null | number
}

export type GHInsightRepo = {
  id: number
  name: string
  description: string
  archived: boolean
  updated_at: string
}
