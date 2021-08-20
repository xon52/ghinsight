import { ref } from 'vue'
import { idb } from '@/utils/helpers'
import {github} from '@/scripts'
import { githubStore } from './'

// State
const state = {
  user: ref<string>(),
  org: ref<string>(),
  pat: ref<string>(),
  connected: ref(false),
}

// Getters
const getters = {}

// Actions
const actions = {
  restore: async () => {
    const [user, org, pat] = await idb.getMany(['user', 'org', 'pat'])
    if (user && org && pat) await actions.login(user, org, pat, true)
  },
  login: async (user: string, org: string, pat: string, remember: boolean) => {
    // Github Checks
    try {
      await github.setup(pat, org)
      const myOrgs = await github.check()
      if (myOrgs.length < 1) throw new Error('No organisations found')
      const myOrg = myOrgs.find((e) => e.organization.login.toLocaleLowerCase() === org)
      if (!myOrg) throw new Error('User is not a member of this org')
      if (myOrg.user.login.toLocaleLowerCase() !== user.toLocaleLowerCase())
        throw new Error('Username does not match credentials')
    } catch (err) {
      throw new Error(`LOGIN :: ${err.message}`)
    }
    // Session creation
    state.user.value = user
    state.org.value = org
    state.pat.value = pat
    state.connected.value = true
    // Remember details for next time
    if (remember)
      idb.setMany([
        ['user', user],
        ['org', org],
        ['pat', pat],
        ['remember', remember],
      ])
    else idb.clear()
    // Restore other data
    if (state.connected.value) await githubStore.restore()
  },
}

export default { ...state, ...getters, ...actions }
