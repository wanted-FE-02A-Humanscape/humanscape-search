import { Suspense } from 'react'

import Recommend from './Recommend'

import styles from './RecommendWrap.module.scss'
import { cx } from 'styles'

interface IProps {
  isMoblie?: boolean
  value: string
}

export default function RecommendWrap({ isMoblie, value }: IProps) {
  if (value === '') return null
  return (
    <div className={cx(styles.wrapper, { [styles.modal]: isMoblie })}>
      <Suspense fallback={<div className={styles.loading}>검색 중...</div>}>
        <h3>추천 검색어</h3>
        <Recommend value={value} />
      </Suspense>
    </div>
  )
}
