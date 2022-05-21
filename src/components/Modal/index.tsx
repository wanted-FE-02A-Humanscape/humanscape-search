import Portal from 'components/Portal'

import styles from './Modal.module.scss'

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
