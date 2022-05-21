import { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { SearchIcon } from 'assets/svgs'
import { focusedIdxAtom, inputValueAtom } from 'recoil/diseaseInfo'

import HighlightedText from 'components/HighlightedText'

import styles from './RecommendItem.module.scss'

interface IData {
  sickCd: string
  sickNm: string
}

interface IProps {
  item: IData
  index: number
}

export default function RecommendItem({ item, index }: IProps) {
  const [checked, setChecked] = useState(false)
  const [focusedIdx, setFocusedIdx] = useRecoilState(focusedIdxAtom)
  const setInputVal = useSetRecoilState(inputValueAtom)

  // 키보드 이동으로 검색창 반영
  useEffect(() => {
    if (focusedIdx === index) {
      setChecked(true)
      setFocusedIdx(index)
      setInputVal(item.sickNm)
    } else setChecked(false)
  }, [focusedIdx, index, item.sickNm, setFocusedIdx, setInputVal])

  // 클릭으로 검색창 반영
  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFocusedIdx(index)
    setInputVal(e.target.value)
  }

  return (
    <li className={styles.wrapper}>
      <label>
        <input
          type='radio'
          name='autocompletedKeyword'
          value={item.sickNm}
          onChange={handleItemChange}
          checked={checked}
        />
        <div className={styles.itemCard}>
          <SearchIcon />
          <HighlightedText item={item} />
        </div>
      </label>
    </li>
  )
}
