<style>
	#app {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}
	#controls {
		display: flex;
		justify-content: center;
	}
	.timer-expired {
		background: linear-gradient(to right, #851aff, #c23be5);
	}
</style>

<div id="app" class:timer-expired={$timerExpired}>
	<TimerDisplay />

	<div id="controls">
		{#if $timerExpired}
			<button on:click={start}>Start</button>
		{:else}
			{#if $timerRunning}
				<button on:click={pause}>Pause</button>
			{:else}
				<button on:click={resume}>Resume</button>
			{/if}
			<button on:click={start}>Restart</button>
		{/if}
	</div>
</div>

<script>
	import TimerDisplay from "./TimerDisplay.svelte";
	import {
		timerRunning,
		timerExpired,
		start,
		resume,
		pause
	} from "./timer-stores";
</script>
