import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { debounceValueAtom } from 'recoil/diseaseInfo'
import { Item } from 'types/diseaseInfo'
import styles from './HighlightedText.module.scss'

interface Props {
  item: Item
}

function HighlightedText({ item }: Props) {
  const deboVal = useRecoilValue(debounceValueAtom)
  const renderContent = useMemo(() => {
    const regex = new RegExp(`(${deboVal})`, 'gi')
    const regexParts = item.sickNm.split(regex)
    return regexParts.filter(String).map((part, i) => {
      const key = `splitedText-${i}`
      return regex.test(part) ? (
        <mark className={styles.mark} key={key}>
          {part}
        </mark>
      ) : (
        <span key={key}>{part}</span>
      )
    })
  }, [deboVal, item.sickNm])

  return <p className={styles.resultText}>{renderContent}</p>
}

export default HighlightedText
