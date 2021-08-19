<template>
  <page-modal :show="true" title="Login to GH Insight">
    <form :model="model" ref="formRef">
      <!-- User -->
      <label class="block mt-3">
        <span class="text-gray-700">Github Username:</span>
        <input v-model="model.user" type="text" class="block w-full mt-1" placeholder="" />
      </label>
      <!-- Org -->
      <label class="block mt-3">
        <span class="text-gray-700">Github Organisation:</span>
        <input v-model="model.org" type="text" class="block w-full mt-1" placeholder="" />
      </label>
      <!-- PAT -->
      <label class="block mt-3">
        <span class="text-gray-700">Personal Access Token:</span>
        <input v-model="model.pat" type="text" class="block w-full mt-1" placeholder="" />
      </label>
      <!-- Remember -->
      <label class="flex mt-3 align-middle">
        <span class="text-gray-700">Remember details:</span>
        <input v-model="model.remember" type="checkbox" class="mt-1 ml-2" />
      </label>
      <hr class="my-5 opacity-25" />
      <!-- Submit -->
      <div class="flex justify-end">
        <x-button @click="handleSubmit" :disabled="working" type="submit"> Start </x-button>
      </div>
    </form>
  </page-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { PageModal } from '@/components'
import { XButton } from '@/utils/components'
import { useRouter } from 'vue-router'
import { sessionStore } from '@/stores'

const router = useRouter()
const formRef = ref()
const working = ref(false)
const model = ref({
  user: sessionStore.user.value || '',
  org: sessionStore.org.value || '',
  pat: sessionStore.pat.value || '',
  remember: localStorage.getItem('remember') === 'TRUE' || false,
})

const handleSubmit = async (e: Event) => {
  const { user, org, pat, remember } = model.value
  sessionStore
    .login(user, org, pat, remember)
    .catch((e) => {
      console.log('Login Errors', e.message)
    })
    .finally(() => {
      working.value = false
    })
}

watch(
  sessionStore.connected,
  (newVal) => {
    if (newVal) router.push('/u/dashboard')
  },
  { immediate: true }
)
</script>
