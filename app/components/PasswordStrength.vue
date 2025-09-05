<script setup lang="ts">
const { t } = useI18n()

const password = defineModel<string | undefined>({ required: true })
const show = ref(false)

function checkStrength(str: string) {
	const requirements = [
		{ regex: /.{8,}/, text: t('auth.password-strength.at-least-8-characters') },
		{ regex: /\d/, text: t('auth.password-strength.at-least-1-number') },
		{ regex: /[a-z]/, text: t('auth.password-strength.at-least-1-lowercase') },
		{ regex: /[A-Z]/, text: t('auth.password-strength.at-least-1-uppercase') }
	]
	
	return requirements.map(req => ({ met: req.regex.test(str), text: req.text }))
}

const strength = computed(() => checkStrength(password.value ?? ''))
const score = computed(() => strength.value.filter(req => req.met).length)

const color = computed(() => {
	if (score.value === 0) return 'neutral'
	if (score.value <= 1) return 'error'
	if (score.value <= 2) return 'warning'
	if (score.value === 3) return 'warning'
	return 'success'
})

const text = computed(() => {
	if (score.value === 0) return t('auth.password-strength.enter-password')
	if (score.value <= 2) return t('auth.password-strength.weak-password')
	if (score.value === 3) return t('auth.password-strength.medium-password')
	return t('auth.password-strength.strong-password')
})
</script>

<template>
	<div class="space-y-2">
		<UFormField :label="t('auth.password')">
			<UInput
				v-model="password"
				:color="color"
				:type="show ? 'text' : 'password'"
				:aria-invalid="score < 4"
				aria-describedby="password-strength"
				:ui="{ trailing: 'pe-1' }"
				class="w-full"
			>
				<template #trailing>
					<UButton
						color="neutral"
						variant="link"
						size="sm"
						:icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
						:aria-label="show ? 'Hide password' : 'Show password'"
						:aria-pressed="show"
						aria-controls="password"
						@click="show = !show"
					/>
				</template>
			</UInput>
		</UFormField>
		
		<UProgress
			:color="color"
			:indicator="text"
			:model-value="score"
			:max="4"
			size="sm"
		/>
		
		<p id="password-strength" class="text-sm font-medium">
			{{ text }}. {{ t('auth.password-strength.must-contain') }}:
		</p>
		
		<ul class="space-y-1" aria-label="Password requirements">
			<li
				v-for="(req, index) in strength"
				:key="index"
				class="flex items-center gap-0.5"
				:class="req.met ? 'text-success' : 'text-muted'"
			>
				<UIcon :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'" class="size-4 shrink-0" />
				
				<span class="text-xs font-light">
          {{ req.text }}
          <span class="sr-only">
            {{ req.met ? ' - Requirement met' : ' - Requirement not met' }}
          </span>
        </span>
			</li>
		</ul>
	</div>
</template>

