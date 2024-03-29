<script lang="ts">
	import { HighscoreSender } from '../scripts/highscore_sender';
	import { gameStore, scoreStore, telegramStore } from '../store/stores.js';
	import { _ } from 'svelte-i18n';
	import { onMount, onDestroy } from 'svelte';
	import type { Highscore, Highscores } from '../types/Highscores';
	import ScoreView from './ScoreView.svelte';

	let score: number;
	let hasAlreadyPlayed: boolean = false;
	const unsubscribeScore = scoreStore.subscribe((value) => {
		score = value;
		hasAlreadyPlayed = value > 0;
	});

	let usingTelegram: boolean;
	const unsubscribeTelegram = telegramStore.subscribe((value) => (usingTelegram = value));

	let highscoreList: Highscore[] = [];

	const resetCount = () => {
		scoreStore.set(0);
	};

	const startNewGame = () => {
		resetCount();
		gameStore.set(true);
	};

	const fetch_scores = () => {
		const highscoreSender = new HighscoreSender();
		highscoreSender
			.get_scores()
			.then((response: Highscores) => {
				highscoreList = response.result;
			})
			.catch((e) => {
				console.error(e);
				highscoreList = [];
			});
	};

	const handleKeyup = (event: KeyboardEvent) => {
		if (event.key === ' ') {
			startNewGame();
		}
	};

	onMount(() => {
		// @ts-ignore
		if (Object.keys(TelegramGameProxy?.initParams).length === 0) {
			telegramStore.set(false);
		} else {
			telegramStore.set(true);
		}

		if (usingTelegram) {
			fetch_scores();
		}

		document.addEventListener('keyup', handleKeyup);
		return () => document.removeEventListener('keyup', handleKeyup);
	});

	onDestroy(() => {
		unsubscribeScore();
		unsubscribeTelegram();
	});
</script>

<section>
	<h3>
		<span class="title">
			<h1>{$_('title')}</h1>
		</span>
	</h3>

	{#if hasAlreadyPlayed}
		<h1>{$_('you_scored_before_number')} <b>{score}</b> {$_('you_scored_after_number')}</h1>
	{:else}
		<img src="dansende-blomst.gif" alt="sunflower" />
	{/if}

	{#if usingTelegram}
		<div class="highscore_list">
			<h3>{$_('highscores')}</h3>
			<ul>
				{#each highscoreList as highscore, i}
					{#if i == 3 && highscore.position > 4}
						<li>...</li>
					{/if}
					<ScoreView {highscore} />
				{/each}
			</ul>
		</div>
	{:else if hasAlreadyPlayed}
		<p>
			{$_('highscores_no_telegram')}
			<a href="https://t.me/gummangamebot">https://t.me/gummangamebot</a>
		</p>
	{:else}
		<p />
	{/if}

	<button on:click={startNewGame}>{hasAlreadyPlayed ? $_('play_again') : $_('play')}</button>
	<p class="hint">{$_('play_again_spacebar_hint')}</p>
</section>

<style>
	section {
		padding: 1rem;
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
		margin-bottom: 48px;
	}

	.highscore_list {
		margin-left: 10vw;
		margin-right: 10vw;
		font-size: 22px;
	}

	@media (min-width: 768px) {
		.highscore_list {
			min-width: 30rem;
		}
	}

	@media (max-width: 768px) {
		.hint {
			display: none;
		}
	}

	.hint {
		opacity: 0.5;
	}

	li {
		color: transparent;
	}

	ul {
		list-style: none;
		padding-left: 0px;
	}
</style>
