import styles from '../styles/Header.module.css'
import { useState } from 'react';
import { useEffect } from 'react';

function Header({ gameStarted, setGameStarted, difficulty, setDifficulty, lost, won, currentScore }) {

  const [notrans, setNotrans] = useState(false);

  function noTransition() {
    setNotrans(true);
  };

  useEffect(() => {
    if (!notrans) {
      window.addEventListener('resize', noTransition);
    }
    return () => window.removeEventListener('resize', noTransition);
  }, []);

  return (
    <div className={`${styles.header}
                     ${gameStarted ? styles.lifted : null}
                     ${notrans ? styles.no_transition : null}`}>
        <img src="../../image/logo.png" alt="Game Logo" />
        <div className={styles.game_name}>MEMORY CARD GAME</div>

        <div className={`
                        ${styles.endgame}
                        ${won || lost ? null : styles.hidden}
                        `}>{won ?
                        `CONGRATULATIONS! YOU WIN WITH A SCORE OF ${difficulty}!` :
                        `YOU LOSE WITH A SCORE OF ${currentScore.count}. TRY AGAIN!`}
        </div>

        <button
          className={`${gameStarted ? styles.hidden : null}`}
          onClick={() => {setGameStarted(true)}}
        >START
        </button>
        <div className={`${styles.diff} ${gameStarted ? styles.hidden : null}`}>CHOOSE DIFFICULTY:</div>
        <div className={`${styles.option_container} ${gameStarted ? styles.hidden : null}`}>
            <div className={`${styles.option} ${difficulty === 10 ? styles.chosen : null}`} onClick={() => {setDifficulty(10)}}>EASY</div>
            <div className={`${styles.option} ${difficulty === 15 ? styles.chosen : null}`} onClick={() => {setDifficulty(15)}}>NORMAL</div>
            <div className={`${styles.option} ${difficulty === 20 ? styles.chosen : null}`} onClick={() => {setDifficulty(20)}}>HARD</div>
        </div>
        <div className={`${styles.howto} ${gameStarted ? styles.hidden : null}`}>
          HOW TO PLAY?
          <br />
          Click all the pokemons one by one without repeating yourself!
        </div>
    </div>
  )
}
export default Header