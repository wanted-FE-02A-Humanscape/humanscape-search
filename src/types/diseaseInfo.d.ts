export interface IItem {
  sickCd: string
  sickNm: string
}

export interface IItems {
  item: IItem[]
}

interface IHeader {
  resultCode: string
  resultMsg: string
}

interface IBody {
  items: IItems
  numOfRows: number
  pageNo: number
  totalCount: number
}

interface IResponse {
  header: IHeader
  body: IBody
}

export interface IDiseaseInfoAPIRes {
  response: IResponse
}
