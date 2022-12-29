<script lang="ts">
	import { onDestroy } from 'svelte';
	import Counter from '../components/Counter.svelte';
	import HighscoreSender from '../scripts/highscore.js';
	import { scoreStore, gameStore } from '../store/stores.js';
	import { _ } from 'svelte-i18n'

	let score:number;
	const unsubscribeScore = scoreStore.subscribe((value) => (score = value));

    let gameActive:boolean;
    const unsubscribeGame = gameStore.subscribe((value) => (gameActive = value));

    let deathAnimationPlaying:boolean = false;
    const deathAnimationDuration = 1000;//in ms

	function finish() {
		const highscoreSender = new HighscoreSender();
		highscoreSender.send_score(score);
        deathAnimationPlaying = true;
        setTimeout(() => gameStore.set(false), deathAnimationDuration);
	}

	onDestroy(() => {
		unsubscribeScore();
        unsubscribeGame();
	});
</script>

<section>
	<h1>
		<span class="title">
			<h1>{$_("title")}</h1>
		</span>
	</h1>

	<Counter />

    {#if !deathAnimationPlaying}
        <button on:click={finish}>Finish</button>
    {/if}
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
