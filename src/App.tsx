import React, { ChangeEventHandler, useState } from 'react';
import logo from './logo.svg';
import { Main, Variant } from './Components/Main';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName, updateUserNameTC } from './Actions/UserAC';
import { AppRootStateType } from './Store/store';
import { InitialStateType } from './Reducers/User';
import { UserList } from './Components/UserList';
import s from './App.module.css';
import { CalculatorDragWrapper } from './Components/CalculatorDragWrapper';
const App = React.memo(function () {
  console.log('app');

  const dispatch = useDispatch()
  // const usersState = useSelector<AppRootStateType, InitialStateType>(state => state.UserReducer)
  // const [num, setNum] = useState<number>(0)
  let [element, setElement] = useState<any>(null)

  function changeNum(e: string) {
    dispatch(updateUserNameTC(e))
  }
  return (
    <div className={s.App}>
      <div className={s.calculatorWrapper}>
        <div className={s.calculatorSegments}>
          <CalculatorDragWrapper
            onDragStart={function (e: any) { setElement(e.currentTarget) }}
            draggable
          >
            
          </CalculatorDragWrapper>

          <CalculatorDragWrapper
            onDrop={function (e: any) { e.preventDefault(); e.currentTarget.append(element); setElement(null); console.dir(e.currentTarget)}}
            onDragEnter={function (e: any) { e.preventDefault();}}
            onDragOver={function (e: any) { e.preventDefault();}}
            draggable
          >
            <button onClick={e => {console.log(element);
            }}>fffffff</button>
          </CalculatorDragWrapper>
        </div>
        <div className={s.calculatorPanelWrapper}></div>
      </div>
    </div>
  );
})

export default App;
