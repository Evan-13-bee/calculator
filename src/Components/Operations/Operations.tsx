import React, { DetailedHTMLProps, FC, HtmlHTMLAttributes } from "react";
import s from './Operations.module.scss'
import { OperationsItem } from "./OperationsItem/OperationsItem";

type DefaultDivPropsType = DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>
type OperationsType = DefaultDivPropsType
export const Operations: FC<OperationsType> = React.memo(function ({ ...restProps }) {

  return (
    <div className={s.operationsWrapper} {...restProps}>
      <OperationsItem operator={'/'} />
      <OperationsItem operator={'x'} />
      <OperationsItem operator={'-'} />
      <OperationsItem operator={'+'} />
    </div>
  )
})