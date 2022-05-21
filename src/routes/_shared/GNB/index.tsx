import { useMemo, useRef, useState } from 'react'

import { LogoImage, HamburgerMenu } from 'assets/svgs'
import useOnClickOutside from 'hooks/useOnClickOutside'

import styles from './GNB.module.scss'

export default function GNB() {
  const [mobileMenuState, setMobileMenuState] = useState(false)
  const mobileMenuRef = useRef(null)
  const onClickSetMobileMenu = () => {
    setMobileMenuState((prev) => !prev)
  }
  useOnClickOutside(mobileMenuRef, () => setMobileMenuState(false))

  const mobileMenuButtonList = useMemo(() => {
    return mobileMenuState ? (
      <div className={styles.mobileMenuButtonList}>
        <div ref={mobileMenuRef} className={styles.clickArea}>
          <button type='button' className={styles.menu}>
            소식받기
          </button>
          <button type='button' className={styles.menu}>
            제휴/문의
          </button>
        </div>
      </div>
    ) : null
  }, [mobileMenuState])
  return (
    <nav className={styles.gnb}>
      <ul>
        <LogoImage />
        2-A조
      </ul>
      <div className={styles.right}>
        <button type='button' className={styles.menu}>
          소식받기
        </button>
        <button type='button' className={styles.menu}>
          제휴/문의
        </button>
        <button type='button' className={styles.hamburgerMenu} onClick={onClickSetMobileMenu}>
          <HamburgerMenu />
        </button>
      </div>
      {mobileMenuButtonList}
    </nav>
  )
}
