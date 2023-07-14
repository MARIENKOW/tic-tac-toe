import {useState } from 'react';
import styles from './app.module.scss'
import Button from './components/button/Button';
import History from './components/history/History';
import Title from './components/title/Title';


export default function App() {
  const [nextX, setNextX] = useState(true)
  const [color, setColor] = useState(Array(9).fill('#fff'));
  const [value, setValue] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([{ value, nextX }]);
  const [victory,setVictory] = useState(null)



  function buttonClick(i) {
    if (value[i] || calculateWinner(value) != null) return

    const copy = value.slice();
    setHistory([...history, { value: copy, nextX: !nextX }])

    copy[i] = nextX ? 'x' : '0';

    setValue(copy)
    setNextX(!nextX)

    const coord = calculateWinner(copy);
    if (coord != null) {
      const newColor = color.splice()
      coord.coord.forEach(el => newColor[el] = 'red');
      setColor(newColor)
      setVictory(coord.winner)
    }
  }
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return {coord:[a, b, c],winner:squares[a]};
    }

    return null;
  }
  function historyShow(i) {
    if (history[i].value === value) return
    setHistory(history.slice(0, i + 1));
    console.log(history, history[i]);
    setValue(history[i].value);
    setNextX(history[i].nextX)
    setColor(Array(9).fill('#fff'))
  }

  const info = nextX ? 'x' : 'o';

  const table = Array(9).fill("");

  return (
    <section className={styles.wrapper}>
      <div className={styles.game}>
        <Title victory={victory} info={"next step:" + info}/>
        <section className={styles.main}>
          {
            table.map((el, i) => <Button color={color[i]} key={i} click={() => buttonClick(i)} value={value[i]} />)
          }
        </section>
      </div>
      <div className={styles.info}>
        <h2>All Steps:</h2>
        <ul>
          {history.map((el, i) => <History history={history.length} i={i} key={i} value={i===0?'START':`move #${i}`} click={historyShow.bind(null,i)} />)}
        </ul>
      </div>
    </section>
  )
}
