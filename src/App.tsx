import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent, parseContentIntoSentences } from './lib/content';
import { useSpeech } from './lib/useSpeech';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const [paragraph, setParagraph] = useState<string>('');
  const { 
    currentWordRange,
    currentSentenceIdx,
    playbackState,
    play: playHandler,
    pause: pauseHandler
  } = useSpeech(sentences);

  useEffect(() => {
    loadContentHander();
  }, [])

  const loadContentHander = () => {
    fetchContent().then((data) => {
      const sentences = parseContentIntoSentences(data);
      setParagraph(sentences.join(' '));
      setSentences(sentences);
    });
  }

  return (
    <div className="App">
      {/* <h1>Text to speech</h1> */}
      <div className='container'>
        <CurrentlyReading
          key={ currentSentenceIdx }
          paragraph={paragraph}
          currentWordRange={ currentWordRange } 
          currentSentenceIdx={ currentSentenceIdx } 
          sentences={ sentences } 
        />
        <Controls 
          play={() => playHandler()} 
          pause={() => pauseHandler()} 
          loadNewContent={() => loadContentHander()} 
          state={ playbackState } 
        />
      </div>
    </div>
  );
}

export default App;
