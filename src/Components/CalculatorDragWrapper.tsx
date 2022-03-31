import React, { DetailedHTMLProps, FC, HtmlHTMLAttributes } from "react";

type DefaultInputPropsType = DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>
type CalculatorItemType = DefaultInputPropsType
export const CalculatorDragWrapper: FC<CalculatorItemType> = React.memo(function ({children, ...restProps}) {

  return (
    <div style={{background: 'green', margin: '30px', height: '60px', width: '60px'}} {...restProps}>
      {children}
    </div>
  )
})