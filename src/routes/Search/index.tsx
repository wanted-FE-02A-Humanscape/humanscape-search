import { useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import _ from 'lodash'

import { debounceValueAtom } from 'recoil/diseaseInfo'

import MobileModal from 'components/Modal/MobileModal'
import ModalInput from './ModalInput'
import SearchInput from './SearchInput'
import Setting from 'components/Setting'
import RecommendWrap from './RecommendWrap'

export default function Search() {
  const [globalSearchInput, setGlobalSearchInput] = useRecoilState(debounceValueAtom)
  const [isMobile, setIsMobile] = useState(false)
  const debounceChange = useMemo(
    () =>
      _.debounce((value) => {
        const pattern = /^[가-힣a-zA-Z0-9]+$/
        if (pattern.test(value)) setGlobalSearchInput(value)
        if (value === '') setGlobalSearchInput('')
      }, 1000),
    [setGlobalSearchInput]
  )

  const handleClick = () => setIsMobile((prev) => !prev)

  return (
    <>
      <Setting />
      <SearchInput debounceChange={debounceChange} handleOpen={handleClick} />
      <RecommendWrap value={globalSearchInput} />

      {isMobile && (
        <MobileModal>
          <ModalInput debounceChange={debounceChange} handleClose={handleClick} />
          <RecommendWrap isMobile={isMobile} value={globalSearchInput} />
        </MobileModal>
      )}
    </>
  )
}
