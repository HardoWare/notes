export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	hub: {
		blob: true,
		database: true,
	},
	nitro: {
		experimental: {
			tasks: true,
		}
	},
	i18n: {
		defaultLocale: 'en',
		locales: [
			{ code: 'en', name: 'English', file: 'en.json' },
			{ code: 'pl', name: 'Polski', file: 'pl.json' },
		],
		vueI18n: './i18n.config.ts',
		strategy: 'no_prefix',
		debug: true,
	},
	
	modules: [
		'@nuxt/eslint',
		'@nuxt/image',
		'@nuxt/ui',
		'@nuxthub/core',
		'nuxt-auth-utils',
		'nuxt-security',
		'@nuxt/test-utils/module',
		'@nuxtjs/i18n',
		'@pinia/nuxt'
	]
})