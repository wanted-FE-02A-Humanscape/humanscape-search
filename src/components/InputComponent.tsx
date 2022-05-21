import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { inputValueAtom } from 'recoil/diseaseInfo'
import useInputKeyControl from 'hooks/useInputKeyControl'

interface IProps {
  debounceChange: _.DebouncedFunc<Dispatch<SetStateAction<string>>>
}

export default function InputComponent({ debounceChange }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputVal, setInputVal] = useRecoilState(inputValueAtom)
  const handleKeyControl = useInputKeyControl()

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setInputVal(value)
    debounceChange(value)
  }

  return (
    <input
      type='search'
      placeholder='질환명을 입력해 주세요.'
      ref={inputRef}
      value={inputVal}
      onChange={handleChange}
      onKeyDown={handleKeyControl}
    />
  )
}
