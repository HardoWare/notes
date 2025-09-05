import {defineStore} from 'pinia'
import {useLocalStorage} from '@vueuse/core'

interface Settings {
	theme: 'light' | 'dark'
	language: string
	sidebarOpen: boolean
}

const defaultSettings = (): Settings => {
	return {
		theme: 'light',
		language: 'en',
		sidebarOpen: true,
	}
}

export const useSettingsStore = defineStore('settings',  () => {
	const colorMode = useColorMode()
	const { locales, locale, setLocale} = useI18n()
	
	const settings = ref(
		useLocalStorage<Settings>('settings', defaultSettings())
	)
	
	const isSidebarOpen = computed(() => settings.value.sidebarOpen)
	const isDarkMode = computed(() => colorMode.value === 'dark')
	
	const language = computed({
		get() {
			return locale.value
		},
		async set(_nLocale) {
			await setLocale(_nLocale)
		}
	})
	
	const toggleDarkMode = () => {
		if (colorMode.value === 'dark') {
			settings.value.theme = 'light'
			colorMode.preference = 'light'
		} else {
			settings.value.theme = 'dark'
			colorMode.preference = 'dark'
		}
	}
	
	return {
		settings,
		isSidebarOpen,
		isDarkMode,
		language,
		toggleDarkMode
	}
})