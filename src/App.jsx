import { useState } from 'react';
import styles from './app.module.scss'
import Button from './components/button/Button';
import History from './components/history/History';


export default function App() {
  const [nextX,setNextX] = useState(true)
  // const [color,setColor] = useState(Array(9).fill('#fff'));
  const [value,setValue] = useState(Array(9).fill(null));
  const [history,setHistory] = useState([value]);

  function buttonClick(i){
    if(value[i] || calculateWinner(value) != null)return
    
    const copy = value.slice();
    setHistory([...history,copy])

    if(nextX){
      copy[i]='x'
    }else{
      copy[i]='o'
    }

    setValue(copy)
    setNextX(!nextX)
    calculateWinner(copy)
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        // const newColor = color.splice()
        // newColor[a]=newColor[b]=newColor[c]='red'
        // setColor(newColor)
        return squares[a];
      }
    }

    return null;
  }

  function historyShow(i){
    setHistory(history.slice(0,i+1));
    setValue((old)=>history[i]);
  }


  const info = nextX?'x':'o';

  let table=Array(9).fill(null);
  table=table.map((el,i)=>{
    return <Button  key ={i} click={()=>buttonClick(i)} value={value[i]}/>
  });

  return (
    <section className={styles.wrapper}>
      <h1>{calculateWinner(value)?'Winner:'+calculateWinner(value):"next step:"+info}</h1>
      <section className={styles.main}>
        {table}
      </section>
      <ul>
        {history.map((el,i)=><History key={i} i={i} click={historyShow}/>)}
      </ul>
    </section>
  )
}
