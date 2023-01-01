<script lang="ts">
	import { onDestroy } from 'svelte';
	import Counter from '../components/Counter.svelte';
	import HighscoreSender from '../scripts/highscore.js';
	import { scoreStore, gameStore } from '../store/stores.js';
	import { _ } from 'svelte-i18n'

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

	onDestroy(() => {
		unsubscribeScore();
	});
</script>

<section>
	<Counter />

    {#if !deathAnimationPlaying}
        <button on:click={finish}>Finish</button>
    {/if}
</section>

<style>
</style>
