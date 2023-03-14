<script>
	import { navigating } from '$app/stores';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
</script>

<div class="page">
	<div class="title-bar">
		<a class="app-title" href="/">
			<span class="app-title-text-card">Cards</span>
			<span class="app-title-text">against</span>
			<span class="app-title-text-card">BWG</span>
		</a>
	</div>
	<div class="content">
		{#if $navigating}
			<LoadingSpinner />
		{:else}
			<slot />
		{/if}
	</div>
</div>

<style>
	.page {
		margin: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	.title-bar {
		display: flex;
		background-color: black;
		padding: 8px;
		gap: 8px;
	}
	.app-title {
		font-family: Helvetica;
		font-weight: bolder;
		font-size: x-large;
		margin: 10px;
		text-decoration: none;
	}
	.app-title-text {
		color: white;
		border-radius: 10px;
		border-style: solid;
		border-width: 2px;
		border-color: white;
		padding: 8px;
	}
	.app-title-text-card {
		border-radius: 10px;
		background-color: white;
		color: black;
		padding: 10px;
	}
</style>
