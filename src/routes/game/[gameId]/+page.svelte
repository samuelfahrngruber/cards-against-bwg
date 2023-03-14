<script>
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { game } from '../../../store/game';
</script>

{#if $game === undefined}
	<LoadingSpinner />
{:else}
	<h1>The game is</h1>
	<pre>{JSON.stringify($game, null, 2)}</pre>
{/if}
