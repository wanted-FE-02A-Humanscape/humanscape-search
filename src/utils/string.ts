import _ from 'lodash'

/* 퍼지 문자열 정규식 */

const ch2pattern = (ch: string) => {
  const offset = 44032
  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset
    if (chCode % 28 > 0) {
      return ch
    }
    const begin = Math.floor(chCode / 28) * 28 + offset
    const end = begin + 27
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  }

  return _.escapeRegExp(ch)
}

export const createFuzzyMatcher = (input: string) => {
  const pattern = input
    .split('')
    .map(ch2pattern)
    .map((p) => `(${p})`)
    .join('.*?')

  return new RegExp(pattern)
}

/* 일치한 문자만 하이라이트 표시 */

const highlight = (input: string, match: string) => {
  let lastIndex = 0
  const highlighted = []

  for (const ch of input) {
    const idx = match.indexOf(ch, lastIndex)
    highlighted.push(match.substring(lastIndex, idx))
    highlighted.push(`<mark>${ch}</mark>`)
    lastIndex = idx + 1
  }

  return highlighted.join('')
}

export const getHighlightStr = (regex: RegExp, str: string) =>
  str.replace(regex, (match, ...groups) => {
    const input = groups.slice(0, -2).join('')
    return highlight(input, match)
  })

/* 문자 사이의 거리와 첫 인덱스부터 문자 거리 */

const getDistanceBetweenLetters = (input: string, match: string) => {
  let longestDistance = 0
  let lastIndex = 0

  for (const ch of input) {
    const idx = match.indexOf(ch, lastIndex)
    if (lastIndex > 0) {
      longestDistance = Math.max(longestDistance, idx - lastIndex)
    }
    lastIndex = idx + 1
  }

  return longestDistance
}

export const getDistance = (regex: RegExp, str: string) => {
  const result = str.match(regex)
  if (!result) return null

  const matchStr = result[0]
  const input = result.slice(1).join('').trim()
  const between = getDistanceBetweenLetters(input, matchStr)
  const offset = result.index || 0 // str에서 일치하는 문자열 첫 인덱스
  return { between, offset }
}

export const specialCharacterRegex = /[\\{\\}\\[\]\\/?.,;:|\\)*~`!^\-_+<>@\\#$%&\\\\=\\(\\'\\"]/g
