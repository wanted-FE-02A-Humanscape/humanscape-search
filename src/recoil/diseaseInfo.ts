import { atom } from 'recoil'

export const settingAtom = atom({
  key: 'setting',
  default: {
    maxCnt: 10, // 표시되는 추천 검색어 최대개수
    sickType: 1, // 1:3단상병, 2:4단상병
    medTp: 2, // 	1:한방, 2:의과(양방)
  },
})

export const itemsLengthAtom = atom({
  key: 'itemsLengthAtom',
  default: 0,
})

export const focusedIdxAtom = atom({
  key: 'focusedIndex',
  default: -1,
})

export const inputValueAtom = atom({
  key: 'inputVal',
  default: '',
})

export const searchParamValueAtom = atom({
  key: 'searchParamValueAtom',
  default: '',
})
