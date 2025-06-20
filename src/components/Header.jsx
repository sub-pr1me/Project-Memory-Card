import styles from '../styles/Header.module.css'

function Header({ gameStarted }) {
  return (
    <div className={styles.header}>
        <img src="../../image/logo.png" alt="Game Logo" />
        <div className={styles.game_name}>Memory Card Game</div>
        <button className={`${gameStarted ? styles.hidden : null}`}>START</button>
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