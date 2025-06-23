import styles from './styles/App.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import Header from './components/Header.jsx';
import Display from './components/Display.jsx';
import ControlPanel from './components/ControlPanel.jsx';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(15);
  const [pool, setPool] = useState(null);
  const [clicked, setClicked] = useImmer([]);
  const [currentScore, setCurrentScore] = useImmer({ count: 0 });
  const [bestScore, setBestScore] = useImmer({ count: 0 });
  const [showNames, setShowNames] = useImmer(true);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [restart, setRestart] = useState(false);

  function getLink(url) {
    let cut = url;
    let forward = cut.slice(34);
    let backward = forward.slice(0,-1);
    let result = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${backward}.gif`;
    return result;
  }

  function handleLoss() {
    if (currentScore.count > bestScore.count) {setBestScore((draft) => {draft.count = currentScore.count})};
    setLost(true);
    console.log('YOU LOSE');
  }

  function handleWin() {
    if (currentScore.count > bestScore.count) {setBestScore((draft) => {draft.count = currentScore.count})};
    setWon(true);
    setCurrentScore((draft) => {draft.count = 0});
    console.log('YOU WIN');
  }

  useEffect(() => {
    setRestart(false);
    const abort = new AbortController();
    let names = [];
    let items =[];
    fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100', {signal: abort.signal})
      .then(data => {return data.json()})
      .then(obj => {

        while (names.length < difficulty) {
          // fetching a random pokemon
          let random = obj.results[Math.floor(Math.random()*100)];
          random.name = random.name.toUpperCase();
          random.id = crypto.randomUUID();
          random.gif = getLink(random.url);

          // duplicate absence insurance
          if (!names.includes(random.name)) {
            names.push(random.name);            
            items.push(random);
          };
        };
        setPool(items);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch Aborted');
        };
      })
    return () => {
      abort.abort();
    };
  }, [won, lost, difficulty, restart]);

  if (currentScore.count === difficulty) {
    handleWin();
  }

  return (
    <>
      {
        pool &&
        <>
          <Header
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            lost={lost}
            won={won}
            currentScore={currentScore}
          />
          <Display
            gameStarted={gameStarted}
            pool={pool}
            setPool={setPool}
            clicked={clicked}
            setClicked={setClicked}
            setCurrentScore={setCurrentScore}
            showNames={showNames}
            handleLoss={handleLoss}
            lost={lost}
            won={won}
            difficulty={difficulty}
          />
          <ControlPanel
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
            bestScore={bestScore}
            setBestScore={setBestScore}
            showNames={showNames}
            setShowNames={setShowNames}
            won={won}
            setWon={setWon}
            lost={lost}
            setLost={setLost}
            setRestart={setRestart}
            setClicked={setClicked}
            difficulty={difficulty}
          />
        </>
      }
    </>
  )
}
export default App