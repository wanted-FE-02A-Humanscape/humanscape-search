import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dataLengthAtom, focusedIdxAtom, inputValueAtom } from 'recoil/diseaseInfo'

interface IProps {
  debounceChange: _.DebouncedFunc<Dispatch<SetStateAction<string>>>
  handleOpen: () => void
}

export default function SearchInput({ debounceChange, handleOpen }: IProps) {
  // const [inputVal, setInputVal] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const length = useRecoilValue(dataLengthAtom)
  const [focusedIdx, setFocusedIdx] = useRecoilState(focusedIdxAtom)
  const [inputVal, setInputVal] = useRecoilState(inputValueAtom)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setInputVal(value)
    debounceChange(value)
  }

  const handleKeyControl = (e: React.KeyboardEvent) => {
    if (!e.nativeEvent.isComposing) {
      switch (e.key) {
        case 'ArrowDown':
          if (focusedIdx >= length - 1) {
            setFocusedIdx(0)
            return
          }
          setFocusedIdx(focusedIdx + 1)
          break
        case 'ArrowUp':
          if (focusedIdx <= 0) {
            setFocusedIdx(length - 1)
            return
          }
          setFocusedIdx(focusedIdx - 1)
          break
      }
    }
  }

  return (
    <form className={styles.form}>
      <div className={styles.searchBox}>
        <SearchIcon />
        <input
          type='search'
          placeholder='질환명을 입력해 주세요.'
          ref={inputRef}
          value={inputVal}
          onChange={handleChange}
          onKeyDown={handleKeyControl}
        />
        <button type='submit'>검색</button>
      </div>

      <button type='button' className={styles.activeMobile} onClick={handleOpen}>
        <p>{inputVal || '질환명을 입력해주세요'}</p>
        <SearchIcon />
      </button>
    </form>
  )
}
