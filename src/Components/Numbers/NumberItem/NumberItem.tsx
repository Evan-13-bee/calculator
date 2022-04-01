import React, { FC } from "react";
import s from './NumberItem.module.scss'

export const NumberItem: FC<any> = React.memo(function ({ number, zero }) {

  return (
    <div className={[s.numberItem, (zero && s.numberItem__zero)].join(' ')}>
      {number}
    </div>
  )
})