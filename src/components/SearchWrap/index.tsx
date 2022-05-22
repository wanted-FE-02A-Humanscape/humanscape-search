import { Dispatch, FormEvent, SetStateAction } from 'react'
import { useRecoilValue } from 'recoil'

import { SearchIcon } from 'assets/svgs'
import { inputValueAtom } from 'recoil/diseaseInfo'

import InputComponent from 'components/CommonInput'

import styles from './SearchInput.module.scss'

interface IProps {
  debounceChange: _.DebouncedFunc<Dispatch<SetStateAction<string>>>
  handleOpen: () => void
}

export default function SearchInput({ debounceChange, handleOpen }: IProps) {
  const inputVal = useRecoilValue(inputValueAtom)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        <SearchIcon />
        <InputComponent debounceChange={debounceChange} />
        <button type='submit'>검색</button>
      </div>

      {/* 모바일일 때 표시 */}
      <button type='button' className={styles.activeMobile} onClick={handleOpen}>
        <p>{inputVal || '질환명을 입력해주세요'}</p>
        <SearchIcon />
      </button>
    </form>
  )
}
