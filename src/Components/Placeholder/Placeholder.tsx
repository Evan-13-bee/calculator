import React, { FC } from "react";
import s from './Placeholder.module.scss'

export const Placeholder: FC<any> = React.memo(function({}) {

  return (
    <div className={s.contentWrapper}>
      <h4 className={s.title}>Перетащите сюда</h4>
      <p className={s.text}>любой элемент из левой панели</p>
    </div>
  )
})