import { useQuery } from 'react-query'
import { useRecoilValue, useRecoilState } from 'recoil'
import { settingAtom, dataLengthAtom } from 'recoil/diseaseInfo'
import { getDiseaseInfoApi } from 'services/diseaseInfo.service'
import { createFuzzyMatcher, getDistance } from 'utils/string'
import RecommendItem from './RecommendItem'

interface IProps {
  value: string
}

export default function Recommend({ value }: IProps) {
  const { maxCnt, sickType, medTp } = useRecoilValue(settingAtom)
  const [, setLength] = useRecoilState(dataLengthAtom)

  const { data } = useQuery(
    ['getDiseaseInfoApi', sickType, medTp, maxCnt, value],
    () =>
      getDiseaseInfoApi({ searchText: value, medTp, sickType }).then((res) => {
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

        return dataToSort.slice(0, maxCnt)
      }),
    {
      refetchOnWindowFocus: true,
      retry: 2,
      staleTime: 5 * 60 * 1000,
      suspense: true,
      onSuccess: (res) => {
        setLength(res.length)
      },
    }
  )

  if (!data) return null
  if (data.length === 0) return <div className={styles.errMsg}>검색 결과가 없습니다.</div>
  return (
    <ul>
      {data.map((item, index: number) => (
        <RecommendItem key={item.sickCd} item={item} index={index} />
      ))}
    </ul>
  )
}
