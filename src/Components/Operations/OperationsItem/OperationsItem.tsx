import React, { FC } from "react";
import s from './OperationsItem.module.scss'
type OperationsItemType = {
  operator: string
}
export const OperationsItem: FC<OperationsItemType> = React.memo(function({operator}) {

  return (
    <div className={s.operationItem}>
      {operator}
    </div>
  )
})