import styles from './MoblieModal.module.scss'

import Modal from '..'

interface IProps {
  children: React.ReactNode
}

export default function MoblieModal({ children }: IProps) {
  return (
    <Modal>
      <div className={styles.wrapper}>{children}</div>
    </Modal>
  )
}
