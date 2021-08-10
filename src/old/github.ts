import { ref, computed } from 'vue'

// State
const state = {
  org: ref<string>(),
  pat: ref<string>(),
}

// Getters
const getters = {
  headers: computed(() => ({ Accept: 'application/vnd.github.v3+json', Authorization: `Token ${state.pat.value}` })),
}

// Actions
const actions = {
  getUser: (user: string) => goFetch(`https://api.github.com/users/${user}`, { headers: getters.headers.value }),
}

// Methods
const goFetch = async (url: string, options: any) => {
  try {
    const response = await fetch(url, options)
    const ok = response.ok
    const data = await response.json()
    if (ok) return data
    throw new Error(`GITHUB :: ${data.message}`)
  } catch (error) {
    throw new Error(`FETCH :: ${error.message}`)
  }
}

export const githubStore = { ...state, ...getters, ...actions }
