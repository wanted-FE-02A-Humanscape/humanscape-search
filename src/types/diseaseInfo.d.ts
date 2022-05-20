interface Header {
  resultCode: string
  resultMsg: string
}

interface Item {
  sickCd: string
  sickNm: string
}

interface Items {
  item: Item[]
}

interface Body {
  items: Items
  numOfRows: number
  pageNo: number
  totalCount: number
}

interface Response {
  header: Header
  body: Body
}

export interface IDiseaseInfoAPIRes {
  response: Response
}
