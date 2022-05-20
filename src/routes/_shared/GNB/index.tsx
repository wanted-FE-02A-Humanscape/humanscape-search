import styles from './GNB.module.scss'

import { LogoImage, HamburgerMenu } from 'assets/svgs'

export default function GNB() {
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
        <button type='button' className={styles.hamburgerMenu}>
          <HamburgerMenu />
        </button>
      </div>
    </nav>
  )
}
