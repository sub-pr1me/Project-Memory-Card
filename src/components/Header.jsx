import styles from '../styles/Header.module.css'
import { useState } from 'react';
import { useEffect } from 'react';

function Header({ gameStarted, setGameStarted }) {

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
        <div className={styles.game_name}>Memory Card Game</div>
        <button
          className={`${gameStarted ? styles.hidden : null}`}
          onClick={() => {setGameStarted(true)}}
        >START
        </button>
        <div className={`${styles.diff} ${gameStarted ? styles.hidden : null}`}>Choose Difficulty:</div>
        <div className={`${styles.option_container} ${gameStarted ? styles.hidden : null}`}>
            <div className={`${styles.diff_option}`}>Easy</div>
            <div className={`${styles.diff_option}`}>Normal</div>
            <div className={`${styles.diff_option}`}>Hard</div>
        </div>
    </div>
  )
}
export default Header