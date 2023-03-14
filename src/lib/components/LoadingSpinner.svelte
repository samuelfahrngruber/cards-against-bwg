<div class="container">
	<div class="loading-box">
		<div class="card black-card" />
		<div class="card white-card" />
	</div>
	<span class="loading-text">Loading...</span>
</div>

<style>
	@keyframes shuffle {
		0% {
			transform: translate(0, 0) rotate(0);
			z-index: 1;
		}
		24% {
			z-index: 1;
		}
		25% {
			transform: translate(25px, -10px) rotate(10deg);
			z-index: 0;
		}
		74% {
			z-index: 0;
		}
		75% {
			transform: translate(-25px, 10px) rotate(-10deg);
			z-index: 1;
		}
		100% {
			transform: translate(0, 0) rotate(0);
			z-index: 1;
		}
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 20px;
	}
	.loading-box {
		width: 50px;
		height: 100px;
		position: relative;
	}
	.card {
		position: absolute;

		width: 50px;
		height: 70px;
		border-radius: 10px;
		border-width: 2px;
		border-style: solid;

		animation: shuffle 1s infinite linear;
	}
	.black-card {
		border-color: white;
		background-color: black;
		animation-delay: 0.5s;
	}
	.white-card {
		border-color: black;
		background-color: white;
	}
	.loading-text {
		font-family: Helvetica;
		font-size: large;
	}
</style>
