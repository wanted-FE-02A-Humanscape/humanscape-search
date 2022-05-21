import { ChangeEvent, FormEvent, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { debounceValueAtom, inputValueAtom, settingAtom } from 'recoil/diseaseInfo'
import styles from './SettingForm.module.scss'
import Radio from 'components/Radio'

interface IProps {
  handleClose: () => void
}

export default function SettingForm({ handleClose }: IProps) {
  const [searchSetting, setSearchSetting] = useRecoilState(settingAtom)
  const resetInputVal = useResetRecoilState(inputValueAtom)
  const debounceVal = useResetRecoilState(debounceValueAtom)

  const [maxCnt, setMaxCnt] = useState(searchSetting.maxCnt) // 표시되는 추천 검색어 최대개수
  const [sickType, setSickType] = useState(searchSetting.sickType) // 1:3단상병, 2:4단상병
  const [medTp, setMedTp] = useState(searchSetting.medTp) // 	1:한방, 2:의과(양방)

  const handleChangeCnt = (e: ChangeEvent<HTMLInputElement>) => setMaxCnt(Number(e.currentTarget.value))
  const handleChangeSick = (e: ChangeEvent<HTMLInputElement>) => setSickType(Number(e.currentTarget.value))
  const handleChangeMed = (e: ChangeEvent<HTMLInputElement>) => setMedTp(Number(e.currentTarget.value))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchSetting({
      maxCnt,
      sickType,
      medTp,
    })
    handleClose()
    // search input value 초기화
    resetInputVal()
    debounceVal()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section>
        <h3>추천 검색어 최대 개수(숫자만 입력)</h3>
        <div className={styles.content}>
          <input type='number' value={maxCnt || ''} onChange={handleChangeCnt} />
        </div>
      </section>

      <section>
        <h3>상병 종류</h3>
        <div className={styles.content}>
          <Radio id='sick1' radioName='3단 상병' radioVal={1} value={sickType} handleChange={handleChangeSick} />
          <Radio id='sick2' radioName='4단 상병' radioVal={2} value={sickType} handleChange={handleChangeSick} />
        </div>
      </section>

      <section>
        <h3>진료 종류</h3>
        <div className={styles.content}>
          <Radio id='med1' radioName='한방' radioVal={1} value={medTp} handleChange={handleChangeMed} />
          <Radio id='med2' radioName='양방(의과)' radioVal={2} value={medTp} handleChange={handleChangeMed} />
        </div>
      </section>

      <div className={styles.btnBox}>
        <button type='submit'>완료</button>
        <button type='button' onClick={handleClose}>
          취소
        </button>
      </div>
    </form>
  )
}
