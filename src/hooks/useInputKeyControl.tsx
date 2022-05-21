import { KeyboardEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dataLengthAtom, focusedIdxAtom } from 'recoil/diseaseInfo'

export default function useInputKeyControl() {
  const length = useRecoilValue(dataLengthAtom)
  const [focusedIdx, setFocusedIdx] = useRecoilState(focusedIdxAtom)

  const handleKeyControl = (e: KeyboardEvent) => {
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
        case 'ArrowLeft':
          break
        case 'ArrowRight':
          break
        default:
          setFocusedIdx(-1)
      }
    }
  }

  return handleKeyControl
}
