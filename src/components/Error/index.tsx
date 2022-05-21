import styles from './Error.module.scss'

interface Props {
  error: Error
}

export default function Error({ error }: Props) {
  return (
    <div className={styles.error}>
      <h2>
        Error : {error.message}
        <br />
        새로고침 하세요!
      </h2>
    </div>
  )
}
