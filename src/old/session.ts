import { ref, computed } from 'vue'
import { info, wait } from '@/utils/helpers'
import { decrypt, encrypt } from './crypto'
import { githubStore } from './github'

// State
const state = {
  user: ref<string>(),
  data: ref<any>(),
}

// Getters
const getters = {
  isLoggedIn: computed(() => !!state.data.value),
}

// Actions
const actions = {
  login: async (user: string, org: string, pass: string, pat: string | undefined) => {
    localStorage.setItem('user', user)
    state.user.value = user
    localStorage.setItem('org', org)
    githubStore.org.value = org
    if (pat) {
      localStorage.setItem('pat', encrypt(pat, pass))
      githubStore.pat.value = pat
    } else {
      const savedPat = localStorage.getItem('pat')
      if (!savedPat) throw new Error('No saved personal access token found')
      const dPat = decrypt(savedPat, pass)
      if (!dPat) throw new Error('Password incorrect.')
      githubStore.pat.value = dPat
    }
    return githubStore
      .getUser(user)
      .then((data) => {
        console.log('data', data)
        state.data.value = data
      })
      .catch((e) => {
        throw new Error(e)
      })
  },
  clear: async () => {
    githubStore.pat.value = undefined
    localStorage.removeItem('pat')
  },
}

export const sessionStore = { ...state, ...getters, ...actions }
