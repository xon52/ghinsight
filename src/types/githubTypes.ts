export type GithubUser = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: string
  email: string
  hireable: boolean
  bio: string
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  private_gists: number
  total_private_repos: number
  owned_private_repos: number
  disk_usage: number
  collaborators: number
  two_factor_authentication: boolean
  plan: {
    name: string
    space: number
    private_repos: number
    collaborators: number
  }
}

export type GithubOrg = {
  login: string
  id: number
  node_id: string
  url: string
  repos_url: string
  events_url: string
  hooks_url: string
  issues_url: string
  members_url: string
  public_members_url: string
  avatar_url: string
  description: string
  name: string
  company: string
  blog: string
  location: string
  email: string
  twitter_username: string
  is_verified: boolean
  has_organization_projects: boolean
  has_repository_projects: boolean
  public_repos: number
  public_gists: number
  followers: number
  following: number
  html_url: string
  created_at: string
  updated_at: string
  type: string
  total_private_repos: number
  owned_private_repos: number
  private_gists: number
  disk_usage: number
  collaborators: number
  billing_email: string
  plan: {
    name: string
    space: number
    private_repos: number
    filled_seats: number
    seats: number
  }
  default_repository_permission: string
  members_can_create_repositories: boolean
  two_factor_requirement_enabled: boolean
  members_allowed_repository_creation_type: string
  members_can_create_public_repositories: boolean
  members_can_create_private_repositories: boolean
  members_can_create_internal_repositories: boolean
  members_can_create_pages: boolean
}

export type GithubUserOrg = {
  url: string
  state: string
  role: string
  organization_url: string
  organization: {
    login: string
    id: number
    node_id: string
    url: string
    repos_url: string
    events_url: string
    hooks_url: string
    issues_url: string
    members_url: string
    public_members_url: string
    avatar_url: string
    description: string
  }
  user: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
}

export type GithubRateLimit = {
  resources: {
    core: {
      limit: number
      remaining: number
      reset: number
      used: number
    }
    search: {
      limit: number
      remaining: number
      reset: number
      used: number
    }
    graphql: {
      limit: number
      remaining: number
      reset: number
      used: number
    }
    integration_manifest: {
      limit: number
      remaining: number
      reset: number
      used: number
    }
    code_scanning_upload: {
      limit: number
      remaining: number
      reset: number
      used: number
    }
  }
  rate: {
    limit: number
    remaining: number
    reset: number
    used: number
  }
}

export type GithubTeam = {
  id: number
  node_id: string
  url: string
  html_url: string
  name: string
  slug: string
  description: string
  privacy: string
  permission: string
  members_url: string
  repositories_url: string
  parent: null | GithubTeam
}
