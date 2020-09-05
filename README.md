# react-playback

Playback an array of states like a video, control the animation duration, or fps while normalizing the result across hardware to make the duration match when render times differs from one device to another

## Getting Started

```
npm install react-playback
```

**Step 1 - initialize the hook**

```js
// the hook takes as parameters the array of states and the duration in ms
const [frame, isPlaying, PB] = usePlayback(stateArray, 5000);
```

**Step 2- use the frame state inside your component**

```js
import Grid from "./Grid"
const Wrapper = ({stateArray}) => {
	const [frame, isPlaying, PB] = usePlayback(stateArray, 5000);

	return (
	<div>
		// other components
		<Grid state={frame} />
	<div/>)
}
```

**Step 3- control the animation**

```js
import Grid from "./Grid"
const Wrapper = ({stateArray}) => {
	const [frame, isPlaying, PB] = usePlayback(stateArray, 5000);
	return (
	<div>
		<button
			onClick={() => isPlaying ? PB.pause() : PB.play()}
		>
			{isPlaying?"Pause":"Play"}
		</button>
		<Grid state={frame} />
	<div/>)
}
```
