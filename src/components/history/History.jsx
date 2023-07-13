import styles from './history.module.scss'

export default function({i,click}){
   return(
      <li onClick={()=>click(i)}>move #{i}</li>
   )
}