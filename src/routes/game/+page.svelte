<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { redirect } from '@sveltejs/kit';
	import { newGame } from '../../business/game-logic';

	export let data;
</script>

<h1>New Game</h1>
<h3>Available Decks:</h3>
<ul>
	{#each data.decks as deck}
		<li>
			{deck.name}
			<Button onClick={() => void newGame(deck).then((id) => redirect(302, `/game/${id}`))}
				>create game...</Button
			>
		</li>
	{/each}
</ul>
