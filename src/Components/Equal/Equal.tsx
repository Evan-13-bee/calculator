import React, { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { FC } from "react";
import s from './Equal.module.scss'

type DefaultDivPropsType = DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>
type EqualType = DefaultDivPropsType
export const Equal: FC<EqualType> = React.memo(function ({ ...restProps }) {

  return (
    <div className={s.equal__wrapper} {...restProps}>
      <div className={s.equal}>
        =
      </div>
    </div>
  )
})