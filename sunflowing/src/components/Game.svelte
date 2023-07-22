<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Counter from './Counter.svelte';
	import { HighscoreSender } from '../scripts/highscore_sender';
	import { scoreStore, gameStore, telegramStore } from '../store/stores.js';
	import { _ } from 'svelte-i18n';
	import { GameEngine } from '../scripts/game_engine';

	let score: number;
	const unsubscribeScore = scoreStore.subscribe((value) => (score = value));
	let usingTelegram: boolean;
	const unsubscribeTelegram = telegramStore.subscribe((value) => (usingTelegram = value));

	const deathAnimationDuration = 1600; //in ms

	let gameInterval: number; //Reference to the update interval

	const CANVAS_SIZE = {
		width: 768,
		height: 1024,
	};

	const finish = () => {
		if (usingTelegram) {
			const highscoreSender = new HighscoreSender();
			highscoreSender.send_score(score);
		}
		setTimeout(() => gameStore.set(false), deathAnimationDuration);
	};

	onMount(() => {
		const canvas = document.getElementsByTagName('canvas')[0];
		const gameContext = canvas?.getContext('2d');
		const game = new GameEngine(gameContext!, CANVAS_SIZE.width, CANVAS_SIZE.height, finish);
		gameInterval = setInterval(() => game.update(), 1000 / 60); //60fps
	});

	onDestroy(() => {
		unsubscribeScore();
		unsubscribeTelegram();
		clearInterval(gameInterval);
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

	@media (max-width: 768px) {
		canvas {
			width: auto;
			height: auto;
			max-width: 100%;
			border-style: solid none;
		}
	}

	.counter_wrapper {
		width: 100%;
		justify-content: center;
		display: flex;
	}
</style>
