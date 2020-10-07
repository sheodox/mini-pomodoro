<style>
	#app {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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

<div id="app" class:timer-expired={$timerExpired && !pickingDuration}>
	{#if !pickingDuration}
		<TimerDisplay />
	{/if}

	<div id="controls">
		{#if $timerExpired}
			{#if pickingDuration}
				<DurationSelection on:selected={() => pickingDuration = false} />
			{:else}
				<button on:click={() => pickingDuration = true}>Start</button>
			{/if}
		{:else}
			{#if $timerRunning}
				<button on:click={pause}>Pause</button>
			{:else}
				<button on:click={resume}>Resume</button>
			{/if}
			<button on:click={stop}>Restart</button>
		{/if}
	</div>
</div>

<script>
	import TimerDisplay from "./TimerDisplay.svelte";
	import DurationSelection from './DurationSelection.svelte';
	import {
		timerRunning,
		timerExpired,
		start,
		resume,
		pause,
		stop
	} from "./timer-stores";

	let pickingDuration = false;
</script>
