import { useEffect, useState } from 'react';

import { PlayingState, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/

type SentenceBoundaryType = [number, number, number]
type BoundariesType = {
  [n: number]: SentenceBoundaryType
}


const getSentenceBoundaries: any = (sentences: Array<string>) => {
  const boundaries: any = new Object();
  var end = 0;
  for (const [i, sentence] of sentences.entries()) {
      const len = sentence.length;
      const start = end;
      end += len;
      boundaries[i] = [ start, end, len ]
  }
  return boundaries;
}

const getSentenceIdx = (charIndex: number, boundaries: BoundariesType) => {
  for (const [idx, bound] of Object.entries(boundaries)) {
      if (bound[0] < charIndex && bound[1] > charIndex) {
        return idx as unknown as number;
      }
  }
  return 0;
}

const useSpeech = (sentences: Array<string>) => {
  const paragraph = sentences.join(' ');
  const boundaries = getSentenceBoundaries(sentences);

  useEffect(() => {
    engine.load(paragraph);
    setPlaybackState('initialized');
  }, [sentences]);

  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const engine = createSpeechEngine({
    onBoundary: (e) => {
      setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
      setCurrentSentenceIdx(
        getSentenceIdx(e.charIndex, boundaries)
      );
    },
    onEnd: () => {
      // engine.pause();
      setPlaybackState('ended');
    },
    onStateUpdate: (e) => {
      console.log('engine state changed', e);
    },
  });

  const play = () => { engine.play(); setPlaybackState('playing'); }
  const pause = () => { engine.pause(); setPlaybackState('paused'); }

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
