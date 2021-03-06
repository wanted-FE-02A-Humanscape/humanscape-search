import { ErrorBoundary } from 'react-error-boundary'

import Search from './Search'
import Error from 'components/Error'
import GNB from 'components/GNB'

import styles from './Routes.module.scss'

export default function App() {
  return (
    <div className={styles.app}>
      <ErrorBoundary FallbackComponent={Error}>
        <header>
          <GNB />
          <div className={styles.title}>
            <h1>국내 모든 임상시험 검색하고 온라인으로 참여하기</h1>
          </div>
        </header>
        <main>
          <Search />
        </main>
      </ErrorBoundary>
    </div>
  )
}
