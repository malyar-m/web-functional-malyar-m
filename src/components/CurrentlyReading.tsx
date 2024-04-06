/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  paragraph,
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  paragraph: string;
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {

  const currentSentence = sentences[currentSentenceIdx];
  const words = currentSentence?.split(' ') || [];

  const currentWord = paragraph?.slice(currentWordRange[0], currentWordRange[1])
  // const currentWordIndex = 0

  // console.log(paragraph, currentSentence, words, currentWord, currentWordRange);

  console.log(words, currentWord);
  
  return <div data-testid="currently-reading" key={ currentSentenceIdx }>
      {/* Active sentence */}
      <p className="current-sentence">
        {words.map((word, idx) => 
          <span data-testId='current-word' className={ currentWord === word ? 'current-word' : '' }>{word} </span>
        )}
      </p>
      {/* All sentences */}
      {sentences.map((s, key) => 
        <span key={key}>{s} </span>
      )}
    </div>
  ;
};
