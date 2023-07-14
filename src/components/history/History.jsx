import styles from './history.module.scss'

export default function({value,click,history,i}){
   return(
      <li style={history-1 === i?{}:{cursor:"pointer"}} onClick={click}>{value}</li>
   )
}