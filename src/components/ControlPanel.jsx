import styles from '../styles/ControlPanel.module.css'

const ControlPanel = ({ gameStarted, setGameStarted, currentScore, setCurrentScore, bestScore, setBestScore,
                        setShowNames, showNames, won, setWon, lost, setLost, setRestart, setClicked }) => {
  return (
    <div className={`${styles.controls} ${gameStarted ? null : styles.hidden}`}>
        <div className={styles.scores}>
            <div className={styles.score}>{`SCORE: ${currentScore.count}`}</div>
            <div className={styles.best_score}>{`BEST SCORE: ${bestScore.count}`}</div>
        </div>
        <div className={styles.btns}>
            <button
                onClick={() => {
                    setLost(false);
                    if (currentScore.count > bestScore.count) {setBestScore((draft) => {draft.count = currentScore.count})};
                    setCurrentScore((draft) => {draft.count = 0});
                    setClicked((draft) => {while (draft.length) {draft.pop()}});
                    setRestart(true);
                }}
            >{lost ? 'Try Again' : 'Restart'}</button>
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
            >Main Menu
            </button>
        </div>        
        <div className={`${styles.options} ${won || lost ? styles.hidden : null}`}>
            <input id='show_names' type="checkbox" onChange={() => {setShowNames(!showNames)}}/>
            <label htmlFor='show_names'>Hide Names</label>            
        </div>
    </div>
  )
}
export default ControlPanel