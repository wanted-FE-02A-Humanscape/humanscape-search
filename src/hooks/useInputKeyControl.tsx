import { KeyboardEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { itemsLengthAtom, focusedIdxAtom } from 'recoil/diseaseInfo'

export default function useInputKeyControl() {
  const itemsLength = useRecoilValue(itemsLengthAtom)
  const [focusedIdx, setFocusedIdx] = useRecoilState(focusedIdxAtom)

  const handleKeyControl = (e: KeyboardEvent) => {
    if (!e.nativeEvent.isComposing) {
      switch (e.key) {
        case 'ArrowDown':
          if (focusedIdx >= itemsLength - 1) {
            setFocusedIdx(0)
            return
          }
          setFocusedIdx(focusedIdx + 1)
          break
        case 'ArrowUp':
          if (focusedIdx <= 0) {
            setFocusedIdx(itemsLength - 1)
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
