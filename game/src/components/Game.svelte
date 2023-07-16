<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Counter from './Counter.svelte';
	import { HighscoreSender } from '../scripts/highscore_sender';
	import { scoreStore, gameStore } from '../store/stores.js';
	import { _ } from 'svelte-i18n';
	import { GameEngine } from '../scripts/game_engine';

	let score: number;
	const unsubscribeScore = scoreStore.subscribe((value) => (score = value));

	const deathAnimationDuration = 1000; //in ms

	const CANVAS_SIZE = {
		width: 768,
		height: 1024,
	};

	const finish = () => {
		const highscoreSender = new HighscoreSender();
		highscoreSender.send_score(score);
		setTimeout(() => gameStore.set(false), deathAnimationDuration);
	};

	onMount(() => {
		const canvas = document.getElementsByTagName('canvas')[0];
		const gameContext = canvas?.getContext('2d');
		const game = new GameEngine(gameContext!, CANVAS_SIZE.width, CANVAS_SIZE.height, finish);
		setInterval(() => game.update(), 1000 / 60); //60fps
	});

	onDestroy(() => {
		unsubscribeScore();
	});
</script>

<section>
	<canvas id="canvas" width="{CANVAS_SIZE.width}px" height="{CANVAS_SIZE.height}px" />

	<div class="counter_wrapper">
		<Counter />
	</div>
</section>

<style>
	section {
		width: 100%;
		width: 100%;
	}

	canvas {
		position: relative;
		margin: 0 auto;
		margin-bottom: -4px;
		z-index: 1;
		width: 480px;
		border: solid;
	}

	@media (max-width: 550px) {
		canvas {
			width: auto;
			height: auto;
			max-width: 100%;
		}
	}

	.counter_wrapper {
		width: 100%;
		justify-content: center;
		display: flex;
	}
</style>
