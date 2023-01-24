<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Counter from '../components/Counter.svelte';
	import { HighscoreSender } from '../scripts/highscore_sender';
	import { scoreStore, gameStore } from '../store/stores.js';
	import { _ } from 'svelte-i18n'
	import { GameEngine } from '../scripts/game_engine';

	let score:number;
	const unsubscribeScore = scoreStore.subscribe((value) => (score = value));

    let deathAnimationPlaying:boolean = false;
    const deathAnimationDuration = 1000;//in ms

	function finish() {
		const highscoreSender = new HighscoreSender();
		highscoreSender.send_score(score);
        deathAnimationPlaying = true;
        setTimeout(() => gameStore.set(false), deathAnimationDuration);
	}


	onMount(() => {
		const canvas = document.getElementsByTagName('canvas')[0];
		const gameContext = canvas?.getContext("2d");
		const game = new GameEngine(gameContext!, canvas.width, canvas.height);
		setInterval(() => game.update(), 1000/60); //60fps
	});

	onDestroy(() => {
		unsubscribeScore();
	});
</script>

<section>
	<canvas id="canvas">
	</canvas>

	<div class="counter_wrapper">
		<Counter />
	</div>

    {#if !deathAnimationPlaying}
        <button on:click={finish}>Finish</button>
    {/if}
</section>

<style>

	section {
		width: 100%;
		width: 100%;
	}

	canvas {
		max-width: 600px;
		width: 100%;
		height: 100%;
		background-color: transparent;
		border: solid;
	}

	.counter_wrapper {
		width: 100%;
		justify-content: center;
		display: flex;
	}
</style>
