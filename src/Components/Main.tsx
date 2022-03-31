import React from "react";
import { ChangeEvent, ChangeEventHandler, Dispatch, FC, SetStateAction, useState } from "react"
export enum Variant {
  foo = 'foo',
  bar = 'bar'
}
interface Main {
  article: string
  setArticle: (value: string) => void,
  variant: Variant
}
export const Main: FC<Main> = React.memo(function({ article, setArticle, children }) {
  console.log('main');
  
  
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle(e.currentTarget.value)
  }
  return (
    <div className="">
      <input type="text" value={article} onInput={changeValue} />
      <p>{article}</p>
      {children}
    </div>
  )
})