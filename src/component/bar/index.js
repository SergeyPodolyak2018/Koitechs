import styles from './bar.module.css'


export function Bar(props) {


  return (
    <div className={styles.container}>
      <div className={styles.bar} style={{width:`${props.percent}%`}}></div>
    </div>
  )
}
