<style>
	#durations {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}
</style>

<div id="durations">
	{#each durations as duration}
		<button on:click={() => select(duration)}>{duration}</button>
	{/each}
</div>

<script>
	import {createEventDispatcher} from 'svelte';
	import {start} from './timer-stores';
	const dispatch = createEventDispatcher();

	//options of every five minutes between 5-60 minutes
	const durations = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

	function select(time) {
		start(time);
		dispatch('selected');
	}
</script>