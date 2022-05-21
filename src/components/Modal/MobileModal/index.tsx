import Portal from 'components/Portal'
// import Modal from '..'

import styles from './MobileModal.module.scss'

interface IProps {
  children: React.ReactNode
}

export default function MobileModal({ children }: IProps) {
  return (
    <Portal>
      <div className={styles.mobileOverlay}>{children}</div>
    </Portal>
  )
}
