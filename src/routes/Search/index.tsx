import { useMemo, useState } from 'react'
import _ from 'lodash'

import SearchInput from './SearchInput'
import Setting from 'components/Setting/indes'
import RecommendWrap from './RecommendWrap'
import MobileModal from 'components/Modal/MoblieModal'
import ModalInput from './ModalInput'

export default function Search() {
  const [deboVal, setDeboVal] = useState('')
  const [isMoblie, setIsMoblie] = useState(false)
  const debounceChange = useMemo(
    () =>
      _.debounce((value) => {
        const pattern = /^[가-힣a-zA-Z0-9]+$/
        if (pattern.test(value)) setDeboVal(value)
        if (value === '') setDeboVal('')
      }, 1000),
    []
  )

  const handleClick = () => setIsMoblie((prev) => !prev)

  return (
    <>
      <Setting />
      <SearchInput debounceChange={debounceChange} handleOpen={handleClick} />
      <RecommendWrap value={deboVal} />

      {isMoblie && (
        <MobileModal>
          <ModalInput debounceChange={debounceChange} handleClose={handleClick} />
          <RecommendWrap isMoblie={isMoblie} value={deboVal} />
        </MobileModal>
      )}
    </>
  )
}
