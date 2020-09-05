# react-playback

Playback an array of states like a video, control the animation duration while normalizing the result across hardware to make the duration match when render times differs from one device to another

## Getting Started

```
npm install react-playback
```

**Step 1 - initialize the hook**

```js
// the hook takes as parameters the array of states and the duration in ms and the autoplay setting in boolean which defaults to false
const [frame, isPlaying, PB, isLoop] = usePlayback(stateArray, 5000, true);
```

**Step 2- use the frame state inside your component**

```js
import Grid from "./Grid"
const Wrapper = ({stateArray}) => {
	const [frame, isPlaying, PB, isLoop] = usePlayback(stateArray, 5000, true);

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
	const [frame, isPlaying, PB, isLoop] = usePlayback(stateArray, 5000, true);
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

## The api

**The library is a react custom hook `usePlayback` which takes 3 parameters :**

1. the array of states you wish to playback
2. the duration of each playback in milliseconds
3. a boolean value for whether you want it to autoplay immediately or not

**It returns an array containing the following in this order :**

1. the state of the current frame
2. a boolean representing whether the hook is currently playing the frames
3. an object containing the following methods that allow you to control your playback and settings:

- **clear()** : stops the current playback and removes all frames
- **load(frames, duration, autoplay = false)** : stops the current playback, it takes the same parameters as the usePlayback hook and loads the frames and settings it is given
- **getPrevFrame()** : if playback is inactive, goes to previous frame
- **getNextFrame()** : if playback is inactive, goes to next frame
- **play()** : start playback
- **pause()** : pauses playback at current frame
- **reset()** : stops playback and returns to the first frame
- **updateDuration()** : if playback is inactive, update the duration parameter of the playback
- **setLoop(bool)** : set looping setting

4. a boolean representing whethe the isLoop setting of the playback
