<script>
	import { nickname } from '../store/nickname';

	export let data;
</script>

<h1>The nickname is "{$nickname}"</h1>

<a href="/game">Create a new game...</a>

<h3>Available Games:</h3>

<ul>
	{#each data.games as game}
		<li>
			<span>{Object.keys(game.players).length} Players</span>
			<span>Round {game.round + 1}</span>
			<a href={`/game/${game.id}`}>join game...</a>
		</li>
	{/each}
</ul>
