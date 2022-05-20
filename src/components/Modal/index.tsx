import styles from './Modal.module.scss'
import Portal from 'components/Portal'

interface IProps {
  children: React.ReactNode
}

export default function Modal({ children }: IProps) {
  return (
    <Portal>
      <article className={styles.overlay}>{children}</article>
    </Portal>
  )
}
