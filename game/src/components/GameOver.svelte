<script lang="ts">
	import HighscoreSender from '../scripts/highscore.js';
	import { gameStore, scoreStore } from '../store/stores.js';
	import { _ } from 'svelte-i18n'
	import { onMount, onDestroy } from 'svelte';

	let score:number;
	const unsubscribeScore = scoreStore.subscribe((value) => (score = value));

	const resetCount = () => {
		scoreStore.set(0);
	};

	const startNewGame = () => {
		resetCount();
		gameStore.set(true);
	};

	const fetch_scores = () => {
		const highscoreSender = new HighscoreSender();
		highscoreSender.get_scores();
	}

	onMount(() => {
		fetch_scores();
	})

	onDestroy(() => {
		unsubscribeScore();
	})
</script>

<section>
	<h1>{$_("you_scored_before_number")} <b>{score}</b> {$_("you_scored_after_number")}</h1>

	<h3>
		<span class="title">
			<h1>{$_("highscores")}</h1>
		</span>
	</h3>

	<ul>
	</ul>

	<button on:click={startNewGame}>{$_("play_again")}</button>
</section>

<style>
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
