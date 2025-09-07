<script setup lang="ts">
import {loginValidator, registerValidator} from '#shared/validators'
import type {z} from 'zod'
import type {Form, FormSubmitEvent} from '@nuxt/ui'

type LoginSchema = z.output<typeof loginValidator>
type RegisterSchema = z.output<typeof registerValidator>
const localePath = useLocalePath()
const { locales, locale, setLocale, t } = useI18n()
const $t = useI18n().t

const { fetch } = useUserSession()

const settings = useSettingsStore()
const toast = useToast()
const loginForm = ref<Form<LoginSchema>>()
const registerForm = ref<Form<LoginSchema>>()
const isRegister = ref(false)
const state = reactive<Partial<LoginSchema & RegisterSchema>>({
	login: undefined,
	email: undefined,
	password: undefined,
})

async function onSubmitLogin(event: FormSubmitEvent<LoginSchema>) {
	await $fetch('/api/auth/login', {
		method: 'POST',
		body: {
			email: event.data.email,
			password: event.data.password,
		},
	}).then(() => {
		fetch()
		toast.add({
			title: t('common.success'),
			description: t('auth.login-successful'),
			color: 'success',
		})
		navigateTo('/')
	}).catch((err) => {
		loginForm.value?.setErrors(err.data.data)
	})
}

async function onSubmitRegister(event: FormSubmitEvent<RegisterSchema>) {
	await $fetch('/api/auth/register', {
		method: 'POST',
		body: event.data,
	}).then(() => {
		fetch()
		toast.add({
			title: t('common.success'),
			description: t('auth.register-successful'),
			color: 'success',
		})
		navigateTo('/')
	}).catch((err) => {
		registerForm.value?.setErrors(err.data.data)
	})
}

const language = computed({
	get() {
		return locale.value
	},
	set(_nLocale) {
		setLocale(_nLocale)
	}
})

definePageMeta({
	layout: 'guest',
	i18n: {
		paths: {
			en: '/login',
			pl: '/logowanie',
		}
	}
})

</script>

<template>
	<div class="flex justify-center mt-12">
		<UCard variant="subtle" :ui="{ root: 'w-xl', body: 'space-y-4 ' }">
			<template #header>
				<div class="flex flex-row justify-between">
					<div class="flex flex-row">
						<UButton  :icon="settings.isDarkMode ? 'i-lucide-sun' : 'i-lucide-moon' " variant="ghost" class="w-full justify-start" @click="settings.toggleDarkMode()" />
						<USelect
							v-model="language"
							value-key="code"
							label-key="name"
							icon="i-lucide-languages"
							:items="locales"
							:content="{
								align: 'start',
								side: 'right',
								sideOffset: 4
							}"
							:ui="{
								leadingIcon: 'text-primary',
								value: 'text-semibold text-primary font-semibold',
							}"
							variant="none"
						>
							<template #item-label="{ item }">
								{{ item.name }}
							</template>
						</USelect>
					</div>
					<div class="">
						<USwitch v-model="isRegister" :label="$t('auth.register')" />
					</div>
				</div>
			</template>
			
			<UForm v-if="isRegister" ref="registerForm" :schema="registerValidator" :state="state" class="space-y-4 " @submit="onSubmitRegister">
				<UFormField :label="$t('auth.email')" name="email" >
					<UInput v-model="state.email" class="w-full" />
					<template #error="{ error }">
						<div v-if="error" class="mt-2 text-error">
							{{ $t(error.toString()) }}
						</div>
					</template>
				</UFormField>
				
				<PasswordStrength v-model="state.password" />
				
				<UFormField :label="$t('auth.username')" name="login">
					<UInput v-model="state.login" class="w-full" />
					<template #error="{ error }">
						<div v-if="error" class="mt-2 text-error">
							{{ $t(error.toString()) }}
						</div>
					</template>
				</UFormField>
				
				<UButton :label="$t('auth.register')" type="submit" variant="outline" block />
			</UForm>
			
			<UForm v-else ref="loginForm" :schema="loginValidator" :state="state" class="space-y-4 " @submit="onSubmitLogin">
				<UFormField :label="$t('auth.email')" name="email">
					<UInput v-model="state.email" class="w-full" />
					<template #error="{ error }">
						<div v-if="error" class="mt-2 text-error">
							{{ $t(error.toString()) }}
						</div>
					</template>
				</UFormField>
				
				<UFormField :label="$t('auth.password')" name="password">
					<UInput v-model="state.password" type="password" class="w-full" />
					<template #error="{ error }">
						<div v-if="error" class="mt-2 text-error">
							{{ $t(error.toString()) }}
						</div>
					</template>
				</UFormField>
			
				<UButton :label="$t('auth.login')" type="submit" variant="outline" block />
			</UForm>
			
			<USeparator :label="$t('common.or').toUpperCase()" />
			
			<div class="space-y-4 flex flex-col justify-center ">
				<UButton color="neutral" to="/api/auth/github" external :label="`${$t('auth.login-with')} GitHub`" icon="i-lucide-github" block />
<!--				<UButton color="neutral" :label="`${$t('auth.login-with')} Google`" icon="i-simple-icons-google" block />-->
			</div>
			
			<template #footer>
				<div class="space-y-4">
					<p>
						{{ $t('auth.forgot') }}
						<ULink :to="localePath('reset-password')" variant="outline">
							{{ $t('auth.reset') }}
						</ULink>
					</p>
				</div>
			</template>
		</UCard>
	</div>
</template>

