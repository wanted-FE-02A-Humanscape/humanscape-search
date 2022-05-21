import { useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import _ from 'lodash'

import { debounceValueAtom } from 'recoil/diseaseInfo'

import MobileModal from 'components/Modal/MobileModal'
import ModalInput from './ModalInput'
import Setting from 'components/Setting'
import RecommendWrap from 'components/RecommendWrap/RecommendWrap'
import SearchInput from 'components/SearchWrap'

export default function Search() {
  const [globalSearchInput, setGlobalSearchInput] = useRecoilState(debounceValueAtom) // searchParamValue
  const [isMobile, setIsMobile] = useState(false) // isMobileModalOpen
  const debounceChange = useMemo(
    () =>
      _.debounce((value) => {
        const pattern = /[^ㄱ-ㅎㅏ-ㅢ]/
        if (pattern.test(value)) setGlobalSearchInput(value.trim())
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
