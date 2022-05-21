import { useRef, useState } from 'react'

import { SettingIcon } from 'assets/svgs'
import useOnClickOutside from 'hooks/useOnClickOutside'

import SettingForm from './SettingForm'
import Modal from 'components/Modal'

import styles from './Setting.module.scss'

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
