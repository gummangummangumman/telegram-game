<script lang="ts">
	import type { Highscore } from '../types/Highscores';

	export let highscore: Highscore;

	const isCurrentUser = () => {
		//@ts-ignore
		return highscore.user.id == TelegramGameProxy?.initParams?.user;
	};
</script>

<li class={isCurrentUser() ? 'current_user' : ''}>
	<span class="position">{highscore.position}.</span>
	{highscore.user.first_name}
	{' '}
	{highscore.user.last_name ?? ''}
	<strong class="score">{highscore.score}</strong>
</li>

<style>
	li {
		text-align: left;
		padding: 2px;
		padding-left: 6px;
		padding-right: 6px;
	}

	.current_user {
		background-color: var(--color-bg-0);
		border-radius: 6px;
	}

	.position {
		color: var(--color-text-faded);
	}

	.score {
		position: relative;
		right: 0%;
		float: right;
	}
</style>
