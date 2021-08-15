<template>
  <n-message-provider>
    <page-modal :show="true" title="Login to GH Insight">
      <n-form :model="model" ref="formRef" :disabled="working">
        <!-- User -->
        <n-form-item path="user" label="Github Username:">
          <n-input v-model="model.user" @keydown.enter.prevent />
        </n-form-item>
        <!-- Org -->
        <n-form-item path="org" label="Github Organisation:">
          <n-input v-model="model.org" @keydown.enter.prevent />
        </n-form-item>
        <!-- PAT -->
        <n-form-item path="pat" label="Personal Access Token:">
          <n-input v-model="model.pat" @keydown.enter.prevent />
        </n-form-item>
        <!-- Remember -->
        <n-form-item path="remember" label="Remember details">
          <n-switch v-model="model.remember" />
        </n-form-item>
        <!-- Submit -->
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button @click="handleSubmit" :loading="working" round type="primary"> Start </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </page-modal>
  </n-message-provider>
</template>

<script setup lang="ts">
type FormErrorType = Array<Array<{ message: string; fieldValue: string; field: string }>>

import { ref, watch } from 'vue'
import { PageModal } from '@/utils'
import { useRouter } from 'vue-router'
import { sessionStore } from '@/stores'
import { NMessageProvider, NForm, NFormItem, NInput, NSwitch, NButton, NCol, NRow, useMessage } from 'naive-ui'

const router = useRouter()
const message = useMessage()
const formRef = ref()
const working = ref(false)
const model = ref({
  user: sessionStore.user.value || '',
  org: sessionStore.org.value || '',
  pat: sessionStore.pat.value || '',
  remember: localStorage.getItem('remember') === 'TRUE' || false,
})
// const ruleRequired = { required: true, message: 'Required', trigger: ['input', 'blur'] }
// const ruleMinChars = {
//   validator: (rule: undefined, val: string) => (val.length > 3 ? true : new Error('Please enter a real value')),
//   trigger: ['blur'],
// }
// const rules = {
//   user: [ruleRequired, ruleMinChars],
//   org: [ruleRequired, ruleMinChars],
//   pat: [ruleRequired, ruleMinChars],
// }

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  formRef.value.validate((errors: FormErrorType | null) => {
    working.value = true
    if (!!errors) {
      message.error('Invalid form field values')
      console.log('Form Errors', errors.flat(1))
      working.value = false
    } else {
      const asyncMsg = message.loading('Checking credentials...')
      const { user, org, pat, remember } = model.value
      sessionStore
        .login(user, org, pat, remember)
        .catch((e) => {
          message.error('Invalid credentials')
          console.log('Login Errors', e.message)
        })
        .finally(() => {
          asyncMsg.destroy()
          working.value = false
        })
    }
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
