<script>
	import { navigating } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { nickname } from '../store/nickname';
</script>

<div>
	<div>
		<a href="/">
			<span>Cards</span>
			<span>against</span>
			<span>BWG</span>
		</a>
		<div>
			<span>{`🥸 ${$nickname}`}</span>
			<Button
				onClick={() => nickname.setNickname(prompt('Enter your nickname:', $nickname) ?? $nickname)}
			>
				✏️
			</Button>
		</div>
	</div>
	<div>
		{#if $navigating}
			<LoadingSpinner />
		{:else}
			<slot />
		{/if}
	</div>
</div>
