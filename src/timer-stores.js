import {writable, derived, get} from 'svelte/store';

function paddedTimeUnit(time) {
	return Math.floor(time).toString().padStart(2, '0');
}
function toPrettyTime(ms) {
	//prevent showing negative numbers
	const totalSeconds = Math.max(ms, 0) / 1000,
		minutes = Math.floor(totalSeconds / 60),
		seconds = Math.floor(totalSeconds % 60);

	return `${paddedTimeUnit(minutes)}:${paddedTimeUnit(seconds)}`;
}

export const timeRemaining = writable(0);
export const timerRunning = writable(false);
export const timerExpired = derived([timeRemaining], ([remaining]) => remaining <= 0);
export const timerStartMinutes = writable(60);

let timerTickInterval;
timerRunning.subscribe(running => {
	let lastTime;
	function tick() {
		timerTickInterval = requestAnimationFrame(tick);

		const delta = Date.now() - lastTime;
		timeRemaining.update(time => {
			return time - delta;
		});
		lastTime = Date.now();
	}

	if (running) {
		lastTime = Date.now();
		tick();
	}
	else {
		cancelAnimationFrame(timerTickInterval);
	}
})

timeRemaining.subscribe(remaining => {
	if (remaining < 0) {
		timerRunning.set(false);
	}
})

export const start = (minutes) => {
	timeRemaining.set(minutes * 60 * 1000);
	timerRunning.set(true);
}
export const pause = () => {
	timerRunning.set(false);
}
export const resume = () => {
	timerRunning.set(true);
}
export const stop = () => {
	//let it think the timer expired to allow the normal cleanup to take place
	timeRemaining.set(-1);
}

export const prettyTimeRemaining = derived([timeRemaining], ([remaining]) => {
	return toPrettyTime(remaining);
})