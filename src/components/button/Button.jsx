import Styles from './button.module.scss'

export default function Button({value,click,color}){
   return(
      <button className={Styles.btn} style={{background:color}} onClick={click}>{value}</button>
   )
}