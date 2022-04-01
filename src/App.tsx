import React, { ChangeEventHandler, DragEvent, DragEventHandler, useState } from 'react';
import logo from './logo.svg';
import { Main, Variant } from './Components/Main';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName, updateUserNameTC } from './Actions/UserAC';
import { AppRootStateType } from './Store/store';
import { InitialStateType } from './Reducers/User';
import { UserList } from './Components/UserList';
import s from './App.module.scss';
import { CalculatorDragWrapper } from './Components/CalculatorDragWrapper';
import { Answer } from './Components/Answer/Answer';
import { Operations } from './Components/Operations/Operations';
import { Numbers } from './Components/Numbers/Numbers';
import { Equal } from './Components/Equal/Equal';
type arrayElemetType = {
  component: JSX.Element,
  order: number,
  id: number
}
const App = React.memo(function () {
  console.log('app');

  const dispatch = useDispatch()
  // const usersState = useSelector<AppRootStateType, InitialStateType>(state => state.UserReducer)
  // const [num, setNum] = useState<number>(0)
  const [element, setElement] = useState<arrayElemetType | null>(null)
  const [currentBoard, setCurrentBoard] = useState<arrayElemetType[] | null>(null)

  const [firstCellElements, setFirstCellElements] = useState<Array<arrayElemetType>>([
    {
      component: (
        <Answer />
      ),
      order: 1,
      id: 1
    },
    {
      component: (
        <Operations />
      ),
      order: 2,
      id: 2
    },
    {
      component: (
        <Numbers />
      ),
      order: 3,
      id: 3
    },
    {
      component: (
        <Equal />
      ),
      order: 4,
      id: 4
    },
  ])
  const [secondCellElements, setSecondCellElements] = useState<Array<arrayElemetType>>([])

  function changeNum(e: string) {
    dispatch(updateUserNameTC(e))
  }

  function onDragStart(e: arrayElemetType, board: arrayElemetType[]) {
    setElement(e)
    setCurrentBoard(board)
  }

  function onDragDrop(e: any, board: Array<arrayElemetType>) {
    e.preventDefault();
    if (!element || !currentBoard) return
    let elemIndex = currentBoard.findIndex(t => t.id === element.id)
    let bottomBoard = currentBoard === board ? currentBoard : board
    let bottomElementID = e.target.closest('[data-id]')
    if (bottomElementID) { bottomElementID = bottomElementID.dataset.id; }
    let bottomElementIndex = bottomBoard.findIndex(c => c.id === +bottomElementID)
    if ((bottomElementIndex > -1) && currentBoard === board) {
      if (currentBoard === board) {
        currentBoard.splice(elemIndex, 1)
        currentBoard.splice(bottomElementIndex, 0, element)
      }
      currentBoard === firstCellElements ? setFirstCellElements([...currentBoard]) : setSecondCellElements([...currentBoard])
      return
    } else {
      currentBoard.splice(elemIndex, 1)
      
      if (bottomElementIndex > -1) {
        board.splice(bottomElementIndex + 1, 0, element)
      } else {
        board.push(element)
      }
    }
    if (currentBoard === firstCellElements) {
      setFirstCellElements([...currentBoard])
      setSecondCellElements([...board])
    } else if (currentBoard === secondCellElements) {
      setFirstCellElements([...board])
      setSecondCellElements([...currentBoard])
    }

    setElement(null);
    setCurrentBoard(null);
  }

  return (
    <div className={s.App}>
      <div className={s.calculatorWrapper}>

        <div className={s.calculatorSegments}>
          <CalculatorDragWrapper
            style={{ minHeight: '50px', height: '100%', minWidth: '50px', }}
            onDrop={(e: any) => onDragDrop(e, firstCellElements)}
            onDragOver={function (e: any) { e.preventDefault(); }}
          >
            {firstCellElements.map(e => (
              <div
                draggable
                onDragStart={() => { onDragStart(e, firstCellElements) }}
                key={e.id}
                data-id={e.order}
              >{e.component}
              </div>
            ))}
          </CalculatorDragWrapper>
        </div>

        <div className={s.calculatorPanelWrapper}>
          <CalculatorDragWrapper
            onDrop={(e: any) => onDragDrop(e, secondCellElements)}
            onDragOver={function (e: any) { e.preventDefault(); }}
            style={{ minHeight: '50px', minWidth: '50px', height: '100%', border: '1px solid black' }}
          >
            {secondCellElements.map(e => <div
              draggable
              onDragStart={() => { onDragStart(e, secondCellElements) }}
              key={e.id}
              data-id={e.order}
            >{e.component}
            </div>)}
          </CalculatorDragWrapper>
        </div>
      </div>
    </div>
  );
})

export default App;
