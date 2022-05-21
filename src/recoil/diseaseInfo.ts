import { atom } from 'recoil'

export const settingAtom = atom({
  key: 'settingAtom',
  default: {
    maxCnt: 10,
    sickType: 1,
    medTp: 2,
  },
})

export const dataLengthAtom = atom({
  key: 'dataLength',
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

export const debounceValueAtom = atom({
  key: 'deboVal',
  default: '',
})
