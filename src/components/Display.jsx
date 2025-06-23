import styles from '../styles/Display.module.css'

function Display({ gameStarted, pool, setPool, clicked, setClicked,
                   setCurrentScore, showNames, handleLoss, lost, won, difficulty }) {

  function mixPokemons(data) {
    let current = data;
    let mixed = [];
    while (mixed.length < difficulty) {
      let random = Math.floor(Math.random()*10);
      let item = current.pop();
      mixed.splice(random, 0, item);      
    }
    return mixed;
  };

  function handleChoice(item) {
    if (!clicked.includes(item)) {
      setClicked((draft) => {draft.push(item)});
      setCurrentScore((draft) => {draft.count++});
      setPool(mixPokemons(pool));
    } else {
      handleLoss();
    }
  };

  const getRandomKey = () => {
    return crypto.randomUUID();
  }

  return (
    <div className={`${styles.display}
                     ${gameStarted ? null : styles.hidden}
                     ${lost || won ? styles.hidden : null}`
         }
      >
      {pool.map((item) => {
          return (
            <div
              key={getRandomKey()}
              className={`${styles.card} ${styles.enterAnimation}`}
              onClick={() => {handleChoice(item.name)}}
            >
              <img src={item.gif} alt={item.name}/>
              <div className={`${styles.text} ${showNames ? null : styles.exitAnimation}`}>{item.name}</div>
            </div>
          )
        })
      }
    </div>
  )
}
export default Display