import { Suspense } from 'react'
import styles from './RecommendWrap.module.scss'

import Recommend from './Recommend'
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
        <Recommend value={value} />
      </Suspense>
    </div>
  )
}
