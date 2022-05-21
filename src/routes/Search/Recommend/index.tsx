import { useQuery } from 'react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { settingAtom, dataLengthAtom } from 'recoil/diseaseInfo'
import { getDiseaseInfoApi } from 'services/diseaseInfo.service'
import styles from './Recommend.module.scss'
import { createFuzzyMatcher, getDistance } from 'utils/string'
import RecommendItem from './RecommendItem'
import { useEffect } from 'react'

interface IProps {
  value: string
}

export default function Recommend({ value }: IProps) {
  const { maxCnt, sickType, medTp } = useRecoilValue(settingAtom)
  const setLength = useSetRecoilState(dataLengthAtom)

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
      // onSuccess: (res) => {
      //   setLength(res.length)
      // },
    }
  )
  // onSuccess에서 useEffect로 굳이 변경한이유: 셋팅에서 추천검색어 갯수를 변경할 때 쿼리에 있는거면 네트워크 요청이 안감.
  // 그런데 우리는 네트워크 요청이 안간 경우에도 검색 결과의 length를 가져와야 해서 useEffect썼읍니다,,,,
  useEffect(() => {
    if (data) setLength(data.length)
  }, [data, setLength])

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
