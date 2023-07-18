<script lang="ts">
	import { spring } from 'svelte/motion';
	import { onDestroy } from 'svelte';
	import { scoreStore } from '../store/stores.js';

	let count: number;

	const unsubscribe = scoreStore.subscribe((value) => (count = value));

	onDestroy(() => {
		unsubscribe();
	});

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="counter">
	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
			<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
			<strong>{Math.floor($displayed_count)}</strong>
		</div>
	</div>
</div>

<style>
	.counter {
		display: flex;
		margin: 1rem 0;
	}

	.counter-viewport {
		width: 8em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
		user-select: none;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
