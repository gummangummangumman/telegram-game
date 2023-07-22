<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { _, init, addMessages } from 'svelte-i18n';
	import i18n from '../i18n/i18n';
	import Game from '../components/Game.svelte';
	import { gameStore } from '../store/stores.js';
	import GameOver from '../components/GameOver.svelte';

	function i18nSetup() {
		init({
			initialLocale: 'en',
			fallbackLocale: 'en',
		});
		addMessages('en', i18n.en);
		addMessages('nb', i18n.nb);
		addMessages('ru', i18n.ru);
		addMessages('de', i18n.de);
		addMessages('fr', i18n.fr);
	}
	i18nSetup();

	onMount(() => {
		// @ts-ignore
		const lang = TelegramGameProxy?.initParams?.lang;
		init({
			initialLocale: lang,
			fallbackLocale: 'en',
		});
	});

	let gameActive: boolean;
	const unsubscribeGame = gameStore.subscribe((value) => (gameActive = value));

	onDestroy(() => {
		unsubscribeGame();
	});
</script>

<svelte:head>
	<title>{$_('title')}</title>
	<meta name="description" content={$_('description')} />
</svelte:head>

<section>
	{#if gameActive}
		<Game />
	{:else}
		<GameOver />
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex: 0.6;
	}
</style>
