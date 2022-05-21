import { Suspense } from 'react'

import Recommend from './Recommend'

import styles from './RecommendWrap.module.scss'
import { cx } from 'styles'

interface IProps {
  isMobile?: boolean
  value: string
}

export default function RecommendWrap({ isMobile, value }: IProps) {
  if (value === '') return null
  return (
    <div className={cx(styles.wrapper, { [styles.modal]: isMobile })}>
      <Suspense fallback={<div className={styles.loading}>검색 중...</div>}>
        <h3>추천 검색어</h3>
        <Recommend value={value} />
      </Suspense>
    </div>
  )
}
