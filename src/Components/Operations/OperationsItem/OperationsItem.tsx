import React, { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import { updateAnswerValue, updateCurrentValue } from "../../../Reducers/CalculatorAC";
import s from './OperationsItem.module.scss'
type OperationsItemType = {
  operator: string
}
export const OperationsItem: FC<OperationsItemType> = React.memo(function({operator}) {
  const dispatch = useDispatch()
  const changeInputValue = (value: string) => {
    dispatch(updateCurrentValue(value))
  }

  return (
    <button className={s.operationItem} onClick={() => changeInputValue(operator === 'x' ? '*' : operator)}
    
    >
      {operator}
    </button>
  )
})