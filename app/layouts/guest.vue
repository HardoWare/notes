<script setup lang="ts">

</script>

<template>
	<div class="w-full">
		<header class="w-full flex flex-row justify-between px-4 py-2">
			<div class="flex flex-row items-center gap-4">
				<div class="flex flex-row items-center gap-2">
					<div>
						<NuxtImg src="/media/images/logotype.png" class="aspect-square w-10 bg-gray-200 rounded" />
					</div>
					<span class="text-2xl">{{ $t('page.name') }}</span>
				</div>
			</div>
		</header>
		<main class="w-full">
			<slot />
		</main>
		<footer>
		
		</footer>
	</div>
</template>

<style scoped>

</style>