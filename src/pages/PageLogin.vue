<template>
  <Dialog :visible="true" class="m-2 w-30rem" :draggable="false" :closable="false" header="Login to GH Insight" modal>
    <form class="grid" @submit.prevent="handleSubmit">
      <!-- User -->
      <div class="pt-2 col-5">
        <label for="user">Github Username:</label>
        <InputText class="w-full" id="user" v-model="user" />
      </div>
      <!-- Org -->
      <div class="pt-2 col-5 col-offset-2">
        <label for="org">Github Organisation:</label>
        <InputText class="w-full" id="org" v-model="org" />
      </div>
      <!-- PAT -->
      <div class="pt-2 col-12">
        <label for="pat">Personal Access Token:</label>
        <InputText class="w-full" id="pat" v-model="pat" />
      </div>
      <!-- Remember -->
      <div class="pt-2 col-12 p-field-checkbox">
        <Checkbox id="remember" v-model="remember" :binary="true" />
        <label for="remember"> Remember details</label>
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
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { sessionStore } from '@/stores'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageLogin',
  setup() {
    const user = ref(localStorage.getItem('user') || '')
    const org = ref(localStorage.getItem('org') || '')
    const pat = ref(localStorage.getItem('pat') || '')
    const remember = ref(localStorage.getItem('remember') === 'TRUE' || false)
    const error = ref('')
    const working = ref(false)
    const router = useRouter()

    const canSubmit = computed(() => user.value.length > 3 && org.value.length > 3 && pat.value.length > 3)

    const handleSubmit = () => {
      working.value = true
      error.value = ''
      sessionStore
        .login(user.value, org.value, pat.value, remember.value)
        .catch((e: Error) => (error.value = e.message))
        .finally(() => (working.value = false))
    }

    watch(
      sessionStore.connected,
      (newVal) => {
        if (newVal) router.push('/dashboard')
      },
      { immediate: true }
    )

    return { user, org, pat, remember, canSubmit, working, error, handleSubmit }
  },
})
</script>
