import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { inputValueAtom } from 'recoil/diseaseInfo'

interface IProp {
  item: IData
}

interface IData {
  sickCd: string
  sickNm: string
}

function HighlightedText({ item }: IProp) {
  const inputVal = useRecoilValue(inputValueAtom)

  const renderContent = useMemo(() => {
    const regex = new RegExp(`(${inputVal})`, 'gi')
    const regexParts = item.sickNm.split(regex)

    return regexParts.filter(String).map((part, i) => {
      const key = `splitedText-${i}`
      return regex.test(part) ? <mark key={key}>{part}</mark> : <span key={key}>{part}</span>
    })
  }, [inputVal, item.sickNm])

  return <span>{renderContent}</span>
}

export default HighlightedText
