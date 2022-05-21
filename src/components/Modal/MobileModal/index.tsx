import Modal from '..'

import styles from './MobileModal.module.scss'

interface IProps {
  children: React.ReactNode
}

export default function MobileModal({ children }: IProps) {
  return (
    <Modal>
      <div className={styles.wrapper}>{children}</div>
    </Modal>
  )
}
