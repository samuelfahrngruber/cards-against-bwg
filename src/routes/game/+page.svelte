<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { newGame } from '../../business/game-logic';

	export let data;
</script>

<h1>New Game</h1>
<h3>Available Decks:</h3>
<ul>
	{#each data.decks as deck}
		<li>
			{deck.name}
			<Button onClick={() => void newGame(deck).then((id) => goto(`game/${id}`))}>
				create game...
			</Button>
		</li>
	{/each}
</ul>
