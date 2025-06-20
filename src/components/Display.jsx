import { useState } from 'react'
import { useImmer } from 'use-immer'
import styles from '../styles/Display.module.css'

function Display({ pool, setPool, currentScore, setCurrentScore, bestScore, setBestScore, showNames }) {

  const [clicked, setClicked] = useImmer([]);
  const [hidePokemons, setHidePokemons] = useState(false);

  function mixPokemons(data) {
    let current = data;
    let mixed = [];
    while (mixed.length < 10) {
      let random = Math.floor(Math.random()*10);
      let item = current.pop();
      mixed.splice(random, 0, item);      
    }
    return mixed;
  };

  function handleChoice(item) {
    setHidePokemons(true);
    if (!clicked.includes(item)) {
      setClicked((draft) => {draft.push(item)});
      setCurrentScore((draft) => {draft+1});
      setPool(mixPokemons(pool));
    } else {
      console.log('GAME OVER');
      if (currentScore > bestScore) {setBestScore(currentScore)};
    }
  };

  return (
    <div className={`${styles.display}`}>
      {pool.map((item) => {
          return (
            <div className={styles.card} onClick={() => {handleChoice(item.name)}} key={item.id}>
              <img src={item.gif} alt={item.name} className={`${hidePokemons ? styles.exitAnimation : null}`}/>
              <div className={`${styles.text} ${showNames ? null : styles.hidden}`}>{item.name}</div>
            </div>
          )
        })
      }
    </div>
  )
}
export default Display