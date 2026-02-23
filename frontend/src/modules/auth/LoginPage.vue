<template>
  <div class="auth-container">
    <div class="card auth-card">
      <h2>{{ t('login.title') }}</h2>
      <p>{{ t('login.subtitle') }}</p>
      <form @submit.prevent="onSubmit" class="auth-form">
        <IconField>
          <InputIcon class="pi pi-user" />
          <InputText v-model="form.login" :placeholder="t('field.username')" required />
        </IconField>
        <IconField>
          <InputIcon class="pi pi-lock" />
          <Password v-model="form.password" toggleMask :feedback="false" :placeholder="t('login.password')" required />
        </IconField>
        <Button type="submit" :label="t('login.submit')" :loading="auth.loading" />
      </form>
      <div class="auth-hint">
        <span>{{ t('login.hintAdmin') }}</span>
        <span>{{ t('login.hintDoctor') }}</span>
        <span>{{ t('login.hintTechnician') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useAuthStore } from './auth.store'
import { useToast } from '@/shared/composables/useToast'
import { useI18n } from '@/shared/i18n/i18n'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()
const { t } = useI18n()

const form = reactive({
  login: 'admin',
  password: 'admin123'
})

const onSubmit = async () => {
  try {
    await auth.login(form.login, form.password)
    router.push('/dashboard')
  } catch (error: any) {
    toast.error(error?.message || t('login.error'))
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
}

.auth-card {
  width: min(420px, 100%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form :deep(.p-icon-field),
.auth-form :deep(.p-inputtext),
.auth-form :deep(.p-password) {
  width: 100%;
}

.auth-form :deep(.p-password-input) {
  width: 100%;
}

.auth-hint {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: #4b5b5a;
}
</style>
