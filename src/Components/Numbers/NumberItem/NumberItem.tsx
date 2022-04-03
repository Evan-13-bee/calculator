import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateAnswerValue } from "../../../Reducers/CalculatorAC";
import s from './NumberItem.module.scss'

export const NumberItem: FC<any> = React.memo(function ({ number, zero }) {
  const dispatch = useDispatch()
  const changeInputValue = (value: string) => {
    dispatch(updateAnswerValue(value))
  }

  return (
    <div className={[s.numberItem, (zero && s.numberItem__zero)].join(' ')} onClick={() => changeInputValue(number)}>
      {number}
    </div>
  )
})