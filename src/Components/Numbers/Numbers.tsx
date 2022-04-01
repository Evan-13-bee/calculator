import React, { DetailedHTMLProps, FC, HtmlHTMLAttributes } from "react";
import { NumberItem } from "./NumberItem/NumberItem";
import s from './Numbers.module.scss'

type DefaultDivPropsType = DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>
type NumbersType = DefaultDivPropsType
export const Numbers: FC<NumbersType> = React.memo(function ({...restProps}) {

  return (
    <div className={s.numbers} {...restProps}>
      <NumberItem number={'7'} />
      <NumberItem number={'8'} />
      <NumberItem number={'9'} />
      <NumberItem number={'4'} />
      <NumberItem number={'5'} />
      <NumberItem number={'6'} />
      <NumberItem number={'1'} />
      <NumberItem number={'2'} />
      <NumberItem number={'3'} />
      <NumberItem number={'0'} zero />
      <NumberItem number={','} />
    </div>
  )
})