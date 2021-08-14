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

export type GithubRepo = {
  id: number
  node_id: string
  name: string
  full_name: string
  owner: GithubUser
  private: boolean
  html_url: string
  description: string
  fork: boolean
  url: string
  archive_url: string
  assignees_url: string
  blobs_url: string
  branches_url: string
  collaborators_url: string
  comments_url: string
  commits_url: string
  compare_url: string
  contents_url: string
  contributors_url: string
  deployments_url: string
  downloads_url: string
  events_url: string
  forks_url: string
  git_commits_url: string
  git_refs_url: string
  git_tags_url: string
  git_url: string
  issue_comment_url: string
  issue_events_url: string
  issues_url: string
  keys_url: string
  labels_url: string
  languages_url: string
  merges_url: string
  milestones_url: string
  notifications_url: string
  pulls_url: string
  releases_url: string
  ssh_url: string
  stargazers_url: string
  statuses_url: string
  subscribers_url: string
  subscription_url: string
  tags_url: string
  teams_url: string
  trees_url: string
  clone_url: string
  mirror_url: string
  hooks_url: string
  svn_url: string
  homepage: string
  language: string
  forks_count: number
  stargazers_count: number
  watchers_count: number
  size: number
  default_branch: string
  open_issues_count: number
  is_template: boolean
  topics: string[]
  has_issues: boolean
  has_projects: boolean
  has_wiki: boolean
  has_pages: boolean
  has_downloads: boolean
  archived: boolean
  disabled: boolean
  visibility: string
  pushed_at: string
  created_at: string
  updated_at: string
  permissions: {
    admin: boolean
    push: boolean
    pull: boolean
  }
  template_repository: GithubRepo | null
}
