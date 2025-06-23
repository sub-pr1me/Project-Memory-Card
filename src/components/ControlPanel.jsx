import styles from '../styles/ControlPanel.module.css'

const ControlPanel = ({ gameStarted, setGameStarted, currentScore, setCurrentScore, bestScore, setBestScore,
                        setShowNames, showNames, won, setWon, lost, setLost, setRestart, setClicked, difficulty }) => {
  return (
    <div className={`${styles.controls}
                     ${gameStarted ? null : styles.hidden}
                     ${lost ? styles.column : null}
                     ${difficulty === 10 ? styles.easy : null}
                     ${difficulty === 15 ? styles.normal : null}`}>
        <div className={`${styles.scores} ${won || lost ? styles.hidden : null}`}>
            <div className={styles.score}>{`SCORE: ${currentScore.count}`}</div>
            <div className={styles.best_score}>{`BEST SCORE:  ${bestScore.count}`}</div>
        </div>
        <div className={styles.btns}>
            <button
                onClick={() => {
                    setLost(false);
                    setWon(false);
                    if (currentScore.count > bestScore.count) {setBestScore((draft) => {draft.count = currentScore.count})};
                    setCurrentScore((draft) => {draft.count = 0});
                    setClicked((draft) => {while (draft.length) {draft.pop()}});
                    setRestart(true);
                }}
            >{lost ? 'TRY AGAIN' : 'RESTART'}</button>
            <button
                onClick={() => {
                    if (currentScore.count > bestScore.count) {setBestScore((draft) => {draft.count = currentScore.count})};
                    setCurrentScore((draft) => {draft.count = 0});
                    setWon(false);
                    setLost(false);
                    setClicked((draft) => {while (draft.length) {draft.pop()}});
                    setGameStarted(false);
                    setRestart(true);
                }}
            >MAIN MENU
            </button>
        </div>        
        <div className={`${styles.options} ${won || lost ? styles.hidden : null}`}>
            <input id='show_names' type="checkbox" onChange={() => {setShowNames(!showNames)}}/>
            <label htmlFor='show_names'>HIDE NAMES</label>            
        </div>
    </div>
  )
}
export default ControlPanel