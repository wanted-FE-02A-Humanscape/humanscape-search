import { useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import _ from 'lodash'

import { searchParamValueAtom } from 'recoil/diseaseInfo'

import MobileModal from 'components/Modal/MobileModal'
import ModalInput from './ModalInput'
import Setting from 'components/Setting'
import RecommendWrap from 'components/RecommendWrap/RecommendWrap'
import SearchInput from 'components/SearchWrap'

export default function Search() {
  const [searchParamValue, setSearchParamValue] = useRecoilState(searchParamValueAtom)
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)
  const debounceChange = useMemo(
    () =>
      _.debounce((value) => {
        const pattern = /[^ㄱ-ㅎㅏ-ㅢ]/
        if (pattern.test(value)) setSearchParamValue(value.trim())
        if (value === '') setSearchParamValue('')
      }, 1000),
    [setSearchParamValue]
  )

  const handleClick = () => setIsMobileModalOpen((prev) => !prev)

  return (
    <>
      <Setting />
      <SearchInput debounceChange={debounceChange} handleOpen={handleClick} />
      <RecommendWrap value={searchParamValue} />

      {isMobileModalOpen && (
        <MobileModal>
          <ModalInput debounceChange={debounceChange} handleClose={handleClick} />
          <RecommendWrap isMobile={isMobileModalOpen} value={searchParamValue} />
        </MobileModal>
      )}
    </>
  )
}
