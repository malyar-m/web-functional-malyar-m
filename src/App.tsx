import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  // const { currentWord, currentSentence, controls } = useSpeech(sentences);

  useEffect(() => {
    // console.log();
    const sentence = fetchContent().then((data) => {
      console.log('33', data);
      
      const parsed = parseContentIntoSentences(data);
      setSentences(parsed);
    });
    console.log(sentence);
    
  }, [])

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading />
      </div>
      <div>
        <Controls />
      </div>
    </div>
  );
}

export default App;
