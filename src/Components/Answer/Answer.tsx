import React, { ChangeEvent, DetailedHTMLProps, FC, HtmlHTMLAttributes, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTypeSelector } from "../../Hooks/CustomUseSelector";
import { InitialCalculatorStateType } from "../../Reducers/Calculator";
import { clearAnswerValue, updateAnswerValue, updateCurrentValue } from "../../Reducers/CalculatorAC";
import s from './Answer.module.scss'

type DefaultDivPropsType = DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>
type Answer = DefaultDivPropsType
export const Answer: FC<Answer> = React.memo(function ({ ...restProps }) {
  const dispatch = useDispatch()
  const answer = useTypeSelector<InitialCalculatorStateType>(state => state.CalculatorReducer)
  const clearAnswer = () => {
    dispatch(clearAnswerValue())
  }
  
  useEffect(() => {
    if (Number(answer.current) == Infinity || (String(answer.current) === 'NaN' && answer.current !== 'Не определено')) {
      dispatch(updateAnswerValue('Не определено'))
    }
  })

  return (
    <div
      className={s.answer__wrapper}
      onDoubleClick={() => clearAnswer()}
      {...restProps}
    >
      {restProps.children}
      <input
        type="text"
        disabled
        value={answer.current}
        className={s.answer__input}
      />
    </div>
  )
})