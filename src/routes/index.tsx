import Search from './Search'
import styles from './Routes.module.scss'
import GNB from './_shared/GNB'

export default function App() {
  return (
    <>
      <GNB />
      <div className={styles.app}>
        <header>
          <div className={styles.title}>
            <h1>국내 모든 임상시험 검색하고 온라인으로 참여하기</h1>
          </div>
        </header>
        <main>
          <Search />
        </main>
      </div>
    </>
  )
}
