import { ChangeEvent } from 'react'

import styles from './Radio.module.scss'

interface IProps {
  id: string
  radioName: string
  radioVal: number
  value: number
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Radio({ id, radioVal, radioName, value, handleChange }: IProps) {
  return (
    <label className={styles.radioBox} htmlFor={id}>
      <input type='radio' id={id} value={radioVal} onChange={handleChange} checked={value === radioVal} />
      <span className={styles.mark} />
      {radioName}
    </label>
  )
}
