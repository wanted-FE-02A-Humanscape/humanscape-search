import { axios } from 'hooks/worker'
import { IDiseaseInfoAPIRes, IItem } from 'types/diseaseInfo.d'

const DISEASEINFO_BASE_URL = '/B551182/diseaseInfoService/getDissNameCodeList'
const PROXY = window.location.hostname === 'localhost' ? DISEASEINFO_BASE_URL : '/proxy'

interface IParams {
  sickType: number
  medTp: number
  searchText: string
}

export const getDiseaseInfoApi = async (params: IParams) => {
  try {
    const res = await axios.get<IDiseaseInfoAPIRes>(`${PROXY}`, {
      params: {
        serviceKey: process.env.REACT_APP_API_KEY,
        pageNo: 1,
        numOfRows: 1000,
        diseaseType: 'SICK_NM',
        _type: 'json',
        ...params,
      },
    })
    const data = res.data.response.body.items.item
    const { totalCount } = res.data.response.body
    if (totalCount === 0) return []

    if (totalCount === 1) {
      const emptyData: IItem[] = []
      return emptyData.concat(data)
    }
    return data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
