import { useRef, useState } from 'react'
import styles from './Setting.module.scss'

import SettingForm from './SettingForm'
import Modal from 'components/Modal'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { SettingIcon } from 'assets/svgs'

export default function Setting() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setIsOpen(false))
  const handleClick = () => setIsOpen((prev) => !prev)

  return (
    <>
      <div className={styles.btnBox}>
        <button type='button' onClick={handleClick}>
          <SettingIcon className={styles.icon} />
        </button>
      </div>
      {isOpen && (
        <Modal>
          <div ref={ref}>
            <SettingForm handleClose={handleClick} />
          </div>
        </Modal>
      )}
    </>
  )
}
