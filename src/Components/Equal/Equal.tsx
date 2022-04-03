import React, { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { calculateAnswerValue, updateAnswerValue } from "../../Reducers/CalculatorAC";
import s from './Equal.module.scss'

type DefaultDivPropsType = DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>
type EqualType = DefaultDivPropsType
export const Equal: FC<EqualType> = React.memo(function ({ ...restProps }) {
  const dispatch = useDispatch()
  const changeInputValue = (value: string) => {
    dispatch(calculateAnswerValue('='))
  }

  return (
    <div className={s.equal__wrapper} {...restProps} onClick={() => changeInputValue('=')}>
      <div className={s.equal}>
        =
      </div>
    </div>
  )
})