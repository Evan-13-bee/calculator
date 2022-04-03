import { faArrowAltCircleLeft, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../Hooks/CustomUseSelector";
import { ChangeModeType, InitialCalculatorStateType } from "../../Reducers/Calculator";
import { changeModeValue } from "../../Reducers/CalculatorAC";
import s from './Toggle.module.scss'
export const Toggle: FC = React.memo(function ({ }) {
  const dispatch = useDispatch()
  const mode = useTypeSelector<InitialCalculatorStateType>(state => state.CalculatorReducer)

  function changeMode(value: string) {
    dispatch(changeModeValue(value))
  }

  return (
    <div className={s.toggle}>
      <button
        className={[(mode.mode === ChangeModeType.CALCULATE_MODE ? s.dragMode__active : s.dragMode__disabled), s.icon__runtime].join(' ')}
        onClick={() => { changeMode(ChangeModeType.CALCULATE_MODE) }}
      >
        <FontAwesomeIcon icon={faEye} className={s.icon__eye} /><span className={s.label}>Runtime</span>
      </button>
      <button
        className={[(mode.mode === ChangeModeType.DRAG_MODE ? s.dragMode__active : s.dragMode__disabled), s.icon__constructor].join(' ')}
        onClick={() => { changeMode(ChangeModeType.DRAG_MODE) }}
      >
        <span className={s.icon__code}/><span className={s.label}>Constructor</span>
      </button>
    </div>
  )
})