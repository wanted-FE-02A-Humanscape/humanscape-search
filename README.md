# 휴먼스케이프 기업과제 - 검색어 추천이 있는 검색창 만들기


팀원 : 김준엽, 김항래, 박혜민, 민경미, 지창근  
개발기간 : 22/05/19 ~ 22/05/21  
배포 URL : https://tiny-selkie-b2eb5d.netlify.app/

<br />

### 파일구조 
```
src  
    ├─assets  
    │  └─svgs  
    ├─components
    │  ├─Error
    │  ├─GNB
    |  ├─HighlightedText
    |  ├─Modal
    |  |  └─MobileModal
    |  ├─Radio    
    │  ├─RecommendWrap
    |  |  └─Recommend
    |  |    └─RecommendItem
    |  ├─SearchWrap    
    │  └─Setting
    ├─hooks
    │  └─worker
    ├─recoil
    ├─routes
    │  └─Search
    |    └─ModalInput
    ├─services
    ├─store
    ├─styles
    │  ├─base
    │  ├─constants
    │  └─mixins
    ├─types
    └─utils
```

<br />

### 기술스택
- React

- TypeScript

- SCSS

<br />

### 라이브러리 
- lodash: 4.17.21: debounce를 사용한 API 호출 최적화.

- react-query: 3.39.0: local caching을 사용한 API 최적화

- axios: 0.27.2 : Request&Response

- recoil: 0.7.3-alpha.2: Global variable를 사용

- react-error-boundary: 3.1.4`: response Error 처리

<br />

### 기능 요약
- 검색어를 입력하여 API를 호출하여 추천 검색어를 표시하고, 키보드 이동으로 추천 검색어간의 이동이 가능합니다.

- 설정 아이콘을 누르면 상세 설정을 통해 검색 결과를 지정할 수 있습니다..

- PC와 Mobile 사용자 간의 UI에 대응하여 반응형 브라우저를 구현하였습니다.

- 로컬 캐싱을 지원하여 입력한 검색어가 로컬 캐시에 남아있다면 로컬 캐시에 저장된 검색결과를 가져와 API를 호출을 최적화합니다.

- 추천 검색어는 사용자가 입력한 단어의 우선순위를 계산해 최상단에 가장 가까운 결과가 위치합니다.

<br />

### 기능 구현 설명
>### 추천 검색어
- 추천 검색어 조건 설정
    - 구현 방법
        - **Portal**을 이용해 설정 버튼을 클릭했을 경우 입력 form이 나타납니다.
        - 검색어 조건 상태값은 **Recoil**로 관리해서 api 호출할 때 파라미터로 사용합니다.
    - 이유
        - Portal은 React의 부모-자식 tree 구조에서 벗어나 독립적인 위치에서 렌더링하기 위해 사용했습니다. 그래서 modal을 구현하는 데 적합합니다.
        - Recoil은 어떤 값이 필요한 컴포넌트에 props가 아닌 hook형태로 바로 호출하기 위해 사용했습니다.

- 추천 검색어 정렬
    - 구현 방법
        - 일치하는 문자 사이 거리 - 일치하는 문자 첫 발견 index - 문자 길이 순으로 우선순위를 매겨서 정렬합니다.
        - 일치하는 문자 사이 거리와 일치하는 문자 첫 발견 index는 **`String.prototype.match()`**에 **퍼지 문자열 정규식**을 매개변수를 넣고 반환받은 결과값을 이용해서 얻었습니다.

<br />

>### 반응형 브라우저
반응형 브라우저는 **PC UI**와 **Mobile UI**를 나눠서 사용 환경에 따라 다른 UI&UX가 다른것을 말합니다.
<br />
**PC** 유저는 검색창을 바로 입력할 수 있고 상단의 메뉴 리스트를 통해 다른 페이지로 이동합니다.<br />
 **Mobile** 유저는 검색창 버튼을 클릭하면 입력과 검색결과 창을 모달로 띄워 입력과 추천검색어에 집중할 수 있게 합니다.<br />
 공통된 기능은 추천검색결과를 키보드를 통해 이동할 수 있습니다.
  
- 구현 방법
  
  - 먼저 **PC**와 **Mobile**의 가로 사이즈를 정의합니다.
    765px을 기준으로 이상은 PC UI, 미만은 Mobile UI로 지정합니다.

  - 적용된 기준보다 작을 시에는 PC UI중 검색창은 `display:none`을 지정하여 보이지 않게 하고 `display:none`으로 지정되었던 모바일 검색창 버튼은 `display:flex`을 지정하여 보이게 합니다.

  - 아래의 코드는 모바일 브라우저로 변경 시 input검색창을 숨기고 검색창 Button을 보이게 하기 위한 scss코드의 일부분 입니다.

    ```scss
    // 브라우저의 가로 사이즈가 mobileOnly가 되었을 때,
    // display:none을 display:flex로 전환합니다.
    .activeMobile {
        display: none;

        svg {
          width: 22px;
          height: 22px;
        }
        @include responsive.mobileOnly {
          @include flexbox.flexbox(between, center);
          width: 90%;
          height: 50px;
          padding: 12px 20px;
          background-color: colors.$WHITE;
          border-radius: 30px;
        }
      }

    ```

<br />

>### API 호출 최적화
 입력 마다 API호출을 하면 해당 API의 속도가 느리기 때문에 입력마다 API를 호출하면 원하는 결과를 얻기 힘들며 입력을 수정하는 도중 중복되는 결과를 가져오기 때문에 해당 문제를 해결하기위한 방법은 2가지가 존재합니다.

1. 입력 결과 Debounce

   입력이 지정될 때마다 API를 호출하게 되면 추천검색어 창이 검색된 결과값을 받아올 때마다 바뀌게 됩니다. 사용자는 특정 단어만 입력하였는데 추천검색어 창은 입력마다 받아온 결과를 호출 결과만큼 띄우게 되어 문제가 생깁니다.<br />
  이를 해결하기 위해 사용자의 마지막 입력만을 호출로 지정하고 API를 호출하게 된다면 문제를 해결할 수 있습니다.
 
  - 해결방법

    - 기존에 입력은 입력마다 값이 지정되었으나 debounce로 마지막 입력후 1000ms 이후 입력이 없다면 해당 입력을 호출로 지정합니다.

    - 아래의 코드는 `loadash` 라이브러리의 debounce함수를 사용합니다. 
      **debounce**는 `setTimeOut`의 시간이 설정되고 해당 시간내에 다시 입력이 들어온다면 이전에 지정된 `setTimeOut`은 `clearTimeOut`으로 지워지고 새로운 `setTimeOut`의 시간이 설정됩니다.
      이렇게 입력이 지속되면 `setTimeOut`이 초기화되는데, 만약 입력이 끝나면 `setTimeOut`이 지정한 **Time**이 끝났기 때문에 최종적으로 입력된 값이 `setSearchParamValue(value.trime())`의 최종값이 됩니다.

      ```javascript
      const debounceChange = useMemo(
          () =>
            _.debounce((value) => {
              const pattern = /[^ㄱ-ㅎㅏ-ㅢ]/
              if (pattern.test(value)) setSearchParamValue(value.trim())
              if (value === '') setSearchParamValue('')
            }, 1000),
          [searchParamValue]
        )

      ```

2. Local Caching

   [입력결과 Debounce](#1-입력-결과-debounce)가 되었다면 해당 값을 API의 params로 전달하여 결과값을 호출합니다. 이때 결과값을 **local cache**에 저장한다면 사용자는 다음 입력에서 같은 값을 입력하면 API를 호출하지 않고 **local cache**에 저장된 값을 가져오게 하여 API호출을 최소화 합니다.

  - 구현방법
    - local cache를 가져오기 위한 방법으로 `react-query`를 사용하였습니다. 
  `react-query`를 사용하면 params가 변경될 때만 지정된 API를 호출하고 변경된 값이 없다면 local cache를 사용합니다.

    - 아래의 코드는 `react-query`의 **useQuery**를 사용합니다.

      - 첫번째 파라미터는 local cache의 keyValue로 params를 queryKey로 비교하여 일치하는 key를 찾지 못하면 
      - 두번째 파라미터(함수) getDiseaseInfoApi를 호출하고 새로운 key를 생성합니다. 
      - 세번째 파라미터는 options로 useQuery의 상세 설정을 할 수 있습니다.

    - options
      - `refetchOnWindowFocus`: 데이터가 오래된 경우 쿼리가 다시 fetch할지    지정합니다.

      - `retry`: response 실패 시 다시 호출할 횟수입니다.

      - `staleTime`: local cache에 최신값을 지속하는 시간을 설정합니다.

      - `suspense`: react에서 제공하는 suspense와 같이 동작하여 resonse를 받기 전까지 Suspense가 작동합니다.
      ```javascript
      const { data } = useQuery(
          ['getDiseaseInfoApi', sickType, maxCnt, medTp, value],
          () =>
            getDiseaseInfoApi({ searchText: value, medTp, sickType })
            // ... 상세 기능 생략
          {
            refetchOnWindowFocus: true,
            retry: 2,
            staleTime: 5 * 60 * 1000,
            suspense: true,
          }
        )

      ```

<br />

>### 검색결과 키보드 이동 기능
추천 검색어를 키보드의 방향키로 이동하고 선택하는 기능입니다.  
첫번째 항목에서 위 방향키를 누르면 마지막 항목으로 이동하고,  
마지막 항목에서 아래 방향키를 누르면 첫번째 항목으로 이동합니다.  
항목 이동시에 추천검색어 영역이 함께 스크롤 됩니다.

- 실행 방법
  - 키보드의 위,아래 방향키를 사용하여 추천검색어를 이동합니다.   

- 구현 방법
    - 각각의 추천 검색어 아이템은 보이지 않는 Radio Button과 label로 이루어져 있습니다.
    - Input에서 방향키 조작 시 onKeyDown에 바인딩된 key이벤트 핸들러 함수를 실행시켜 사용자의 키 조작에 따라 focused index를 설정합니다.
    - focused index가 현재 추천 검색어 아이템의 index와 일치할 경우 라디오 버튼에 checked 속성이 부여되고, css를 이용하여 checked 속성에 따른 스타일이 적용되도록 구현했습니다.  

- 이유
    - tabIndex와  tab키를 이용한 하방 이동보다는 방향키를 이용한 양방향 이동이 더 직관적이며 접근성 측면에서 유익하므로 방향키를 이용하여 이동하도록 구현했습니다.
    - radio button은 기본적으로 다른 설정 없이도 방향키 이동이 가능하지만, focus가 Input에 있는 경우에도 방향키 조작을 가능하게 하기 위해 이벤트핸들러 함수를 연결했습니다.

<br />

>### 사용자가 입력한 질환명과 일치하는 부분만 검색결과에서 볼드처리

- 구현 방법

  - HighlightedText라는 컴포넌트를 별도로 생성한 뒤 Recoil을 통해 디바운스된 검색어를 전역 상태에서 받아 옵니다.  <br />

    ```jsx
    const deboVal = useRecoilValue(debounceValueAtom)
    ```

  - 일부 특수문자를 입력하면 발생하는 에러를 해결하기 정규표현식을 사용하여 입력값을 변형시켜줍니다.

    ```jsx
    const resultStr = deboVal.replace(specialCharacterRegex, (match) => `\\${match}`)
    ```

  - 검색결과 문자열을 배열로 만든 뒤  정규표현식을 사용하여  검색어와 일치하는 부분을 기준으로 split 해줍니다.

    ```jsx
    const regex = new RegExp(`(${resultStr})`, 'gi') 
    const regexParts = item.sickNm.split(regex)

    // 검색어가 '간'이고 검색결과가 '경추간판장애'일 때 다음과 같은 배열이 만들어집니다.
    // ['경추', '간', '판장애']
    ```

  - 배열을 map으로 반복문을 돌리면서 검색어 부분만 mark 태그를 사용하여 리턴해줍니다. 

    ```jsx
    return regexParts.filter(String).map((part, i) => {
          const key = `splitedText-${i}`
          return regex.test(part) ? (
            <mark className={styles.mark} key={key}>
              {part}
            </mark>
          ) : (
            <span key={key}>{part}</span>
          )
        })
    ```