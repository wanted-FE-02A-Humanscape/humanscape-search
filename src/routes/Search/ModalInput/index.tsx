import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dataLengthAtom, focusedIdxAtom, inputValueAtom } from 'recoil/diseaseInfo'

import styles from './ModalInput.module.scss'
import { SearchIcon, ArrowIcon } from 'assets/svgs'

interface IProps {
  debounceChange: _.DebouncedFunc<Dispatch<SetStateAction<string>>>
  handleClose: () => void
}

export default function ModalInput({ debounceChange, handleClose }: IProps) {
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
        <button type='button' onClick={handleClose}>
          <ArrowIcon className={styles.icon} />
        </button>
        <input
          type='search'
          placeholder='질환명을 입력해 주세요.'
          ref={inputRef}
          value={inputVal}
          onChange={handleChange}
          onKeyDown={handleKeyControl}
        />
        <button type='submit'>
          <SearchIcon className={styles.icon} />
        </button>
      </div>
    </form>
  )
}
