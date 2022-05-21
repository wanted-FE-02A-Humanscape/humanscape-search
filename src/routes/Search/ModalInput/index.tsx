import { Dispatch, SetStateAction } from 'react'

import { SearchIcon, ArrowIcon } from 'assets/svgs'

import InputComponent from 'components/InputComponent'

import styles from './ModalInput.module.scss'

interface IProps {
  debounceChange: _.DebouncedFunc<Dispatch<SetStateAction<string>>>
  handleClose: () => void
}

export default function ModalInput({ debounceChange, handleClose }: IProps) {
  return (
    <form className={styles.form}>
      <div className={styles.searchBox}>
        <button type='button' onClick={handleClose}>
          <ArrowIcon className={styles.icon} />
        </button>
        <InputComponent debounceChange={debounceChange} />
        <button type='submit'>
          <SearchIcon className={styles.icon} />
        </button>
      </div>
    </form>
  )
}
