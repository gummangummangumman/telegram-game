<script lang="ts">
	import { onDestroy } from 'svelte';
	import Counter from './Counter.svelte';
	import HighscoreSender from './highscore.js';
	import { countStore } from './stores.js';

	let count:number;

	const unsubscribe = countStore.subscribe((value) => (count = value));

	const resetCount = () => {
		countStore.set(0);
	};

	onDestroy(() => {
		unsubscribe();
	});

	function finish() {
		const highscoreSender = new HighscoreSender();
		highscoreSender.send_score(count);
	}

	function fetch_scores() {
		const highscoreSender = new HighscoreSender();
		highscoreSender.get_scores();
	}
</script>

<svelte:head>
	<title>Game</title>
	<meta name="description" content="GuMMaN's epic telegram game" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<h1>Game</h1>
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

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}
</style>
