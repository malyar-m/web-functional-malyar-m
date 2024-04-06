import { PlayingState } from '../lib/speech';

/*
 * Implement a component that provides basic UI options such as playing, pausing and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */
export const Controls = ({
  play,
  pause,
  loadNewContent,
  state,
}: {
  play: () => void;
  pause: () => void;
  loadNewContent: () => void;
  state: PlayingState;
}) => {
  // "initialized" | "playing" | "paused" | "ended";
  const isPlaying = state === 'playing';
  return <div className="buttons">
    <button onClick={() => isPlaying ? pause() : play()}>
      {isPlaying? 'Pause' : 'Play'}
    </button>
    <button onClick={() => loadNewContent()}>
      Load New Content
    </button>
  </div>;
};
