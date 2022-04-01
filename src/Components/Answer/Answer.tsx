import React, { DetailedHTMLProps, FC, HtmlHTMLAttributes } from "react";
import s from './Answer.module.scss'

type DefaultDivPropsType = DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>
type Answer = DefaultDivPropsType
export const Answer: FC<Answer> = React.memo(function ({ ...restProps }) {

  return (
    <div className={s.answer__wrapper} {...restProps}>
      <div className={s.answer}>
        {restProps.children}
      </div>
    </div>
  )
})