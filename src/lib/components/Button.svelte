<script lang="ts">
	export let onClick: () => void | undefined;
</script>

<button class="btn" on:click={onClick}>
	<slot />
</button>

<style>
	.btn {
		border-radius: 10px;
		background-color: white;
		color: black;
		padding: 10px;
	}
</style>
