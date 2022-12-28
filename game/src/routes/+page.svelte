<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Counter from './Counter.svelte';
	import HighscoreSender from './highscore.js';
	import { countStore } from './stores.js';
	import { _, init, addMessages } from 'svelte-i18n'
	import i18n from "../i18n/i18n";

	let count:number;
	const unsubscribeCount = countStore.subscribe((value) => (count = value));

	const resetCount = () => {
		countStore.set(0);
	};

	function finish() {
		const highscoreSender = new HighscoreSender();
		highscoreSender.send_score(count);
		resetCount();
	}

	function fetch_scores() {
		const highscoreSender = new HighscoreSender();
		highscoreSender.get_scores();
	}

	onDestroy(() => {
		unsubscribeCount();
	});

	function i18nSetup() {
		init({
			initialLocale: "en",
			fallbackLocale: "en",
		});
		addMessages("en", i18n.en);
		addMessages("nb", i18n.nb);
		addMessages("ru", i18n.ru);
		addMessages("de", i18n.de);
		addMessages("fr", i18n.fr);
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
</script>

<svelte:head>
	<title>Game</title>
	<meta name="description" content="GuMMaN's epic telegram game" />
</svelte:head>

<section>
	<h1>
		<span class="title">
			<h1>{$_("title")}</h1>
		</span>
	</h1>

	<Counter />

	<button on:click={finish}>Finish</button>
	<button on:click={fetch_scores}>Fetch highscores</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.title {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}
</style>
