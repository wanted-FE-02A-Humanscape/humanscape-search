import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { searchParamValueAtom } from 'recoil/diseaseInfo'
import { specialCharacterRegex } from 'utils/string'
import { IItem } from 'types/diseaseInfo.d'

import styles from './HighlightedText.module.scss'

interface IProps {
  item: IItem
}

function HighlightedText({ item }: IProps) {
  const deboVal = useRecoilValue(searchParamValueAtom)
  const renderContent = useMemo(() => {
    const resultStr = deboVal.replace(specialCharacterRegex, (match) => `\\${match}`)
    const regex = new RegExp(`(${resultStr})`, 'gi')
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
