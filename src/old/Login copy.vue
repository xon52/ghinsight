<template>
  <Dialog :visible="true" class="m-2 w-30rem" :draggable="false" :closable="false" header="Login to GH Insight" modal>
    <form class="grid" @submit.prevent="handleSubmit">
      <!-- User -->
      <div class="pt-2 col-12">
        <label for="user">Github User Name</label>
        <InputText class="w-full" id="user" v-model="user" />
      </div>
      <!-- Org -->
      <div class="pt-2 col-12">
        <label for="org">Github Organisation Name</label>
        <InputText class="w-full" id="org" v-model="org" />
      </div>
      <!-- PAT -->
      <div class="pt-2 col-12">
        <label for="pat">
          Personal Access Token
          <a href="#" v-if="encrypted_pat" @click="handleClear">clear</a>
        </label>
        <Password
          v-if="encrypted_pat"
          :feedback="false"
          disabled
          class="w-full"
          inputClass="w-full"
          id="pat"
          value="EncryptedPersonalAccessToken"
        />
        <InputText v-else class="w-full" id="pat" v-model="pat" />
      </div>
      <!-- Password -->
      <div class="pt-2 col-12">
        <label for="password">Password</label>
        <Password
          :feedback="false"
          autocomplete="current-password"
          class="w-full"
          id="password"
          inputClass="w-full"
          toggleMask
          v-model="pass"
        />
      </div>
      <!-- Error -->
      <template v-if="error.length > 0">
        <Divider />
        <InlineMessage severity="error" @click="error = ''" class="w-full text-left p-link">
          {{ error }}
        </InlineMessage>
      </template>
      <Divider />
    </form>
    <!-- Footer -->
    <template #footer>
      <Button
        type="submit"
        ripple
        class="relative block w-full h-full p-button-lg p-button-rounded p-button-raised"
        :disabled="!canSubmit"
        :loading="working"
        loadingIcon
        @click="handleSubmit"
      >
        <i v-if="working" class="text-xl pi pi-spin pi-spinner"></i>
        <span v-else>Submit</span>
      </Button>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { sessionStore } from '@/stores'

export default defineComponent({
  setup() {
    const user = ref(localStorage.getItem('user') || '')
    const org = ref(localStorage.getItem('org') || '')
    const pass = ref('')
    const pat = ref('')
    const encrypted_pat = ref(localStorage.getItem('pat'))
    const error = ref('')
    const working = ref(false)

    const canSubmit = computed(
      () =>
        user.value.length > 3 &&
        org.value.length > 3 &&
        pass.value.length > 3 &&
        (pat.value.length > 3 || !!encrypted_pat)
    )

    const handleSubmit = () => {
      working.value = true
      sessionStore
        .login(user.value, org.value, pass.value, pat.value)
        .catch((e: Error) => (error.value = e.message))
        .finally(() => (working.value = false))
    }

    const handleClear = () => {
      sessionStore.clear()
      encrypted_pat.value = null
    }

    return { user, org, encrypted_pat, pat, pass, canSubmit, working, error, handleSubmit, handleClear }
  },
})
</script>
