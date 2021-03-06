import { useQuery } from 'react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { createFuzzyMatcher, getDistance } from 'utils/string'
import { getDiseaseInfoApi } from 'services/diseaseInfo.service'
import { settingAtom, itemsLengthAtom } from 'recoil/diseaseInfo'

import RecommendItem from './RecommendItem'

import styles from './Recommend.module.scss'
import { useEffect } from 'react'

interface IProps {
  value: string
}

export default function Recommend({ value }: IProps) {
  const { maxCnt, sickType, medTp } = useRecoilValue(settingAtom)
  const setLength = useSetRecoilState(itemsLengthAtom)

  const { data } = useQuery(
    ['getDiseaseInfoApi', sickType, maxCnt, medTp, value],
    () =>
      getDiseaseInfoApi({ searchText: value, medTp, sickType }).then((res) => {
        // eslint-disable-next-line no-console
        console.count('api 호출')

        const regex = createFuzzyMatcher(value)
        const dataToSort = res.map((item) => ({
          ...item,
          distance: getDistance(regex, item.sickNm),
        }))

        dataToSort.sort((a, b) => {
          if (!a.distance || !b.distance) return 0

          // 정렬 우선 순위
          // 문자 사이 거리 - 문자 첫 발견 인덱스 - 문자 길이
          if (a.distance.between > b.distance.between) return 1
          if (a.distance.between < b.distance.between) return -1

          if (a.distance.offset > b.distance.offset) return 1
          if (a.distance.offset < b.distance.offset) return -1

          if (a.sickNm.length > b.sickNm.length) return 1
          if (a.sickNm.length < b.sickNm.length) return -1

          return 0
        })

        const result = dataToSort.slice(0, maxCnt)

        return result
      }),
    {
      refetchOnWindowFocus: true,
      retry: 2,
      staleTime: 5 * 60 * 1000,
      suspense: true,
    }
  )

  useEffect(() => {
    if (data) setLength(data.length)
  }, [data, setLength])

  if (!data) return null
  if (data.length === 0) return <p className={styles.noResults}>검색 결과가 없습니다.</p>
  return (
    <ul>
      {data.map((item, index: number) => (
        <RecommendItem key={item.sickCd} item={item} index={index} />
      ))}
    </ul>
  )
}
