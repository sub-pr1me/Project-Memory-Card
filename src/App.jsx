import styles from './styles/App.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Display from './components/Display.jsx';

function App() {

  const [pool, setPool] = useState(null);
  const [difficulty, setDifficulty] = useState(10);

  function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  function getLink(url) {
    let cut = url;
    let forward = cut.slice(34);
    let backward = forward.slice(0,-1);
    let result = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${backward}.gif`;
    return result;
  }

  useEffect(() => {
    const abort = new AbortController();
    let names = [];
    let items =[];
    fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100', {signal: abort.signal})
      .then(data => {return data.json()})
      .then(obj => {

        while (names.length < difficulty) {
          // fetching a random pokemon
          let random = obj.results[Math.floor(Math.random()*100)];
          random.name = capitalize(random.name);
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
  }, []);

  return (
    <>
      {
        pool && 
        <Display pool={pool}/>
      }
    </>
  )
}
export default App