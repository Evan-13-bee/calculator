import React, { ChangeEventHandler, DragEvent, DragEventHandler, useState } from 'react';
import logo from './logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName, updateUserNameTC } from './Reducers/UserAC';
import { AppRootStateType } from './Store/store';
import { InitialStateType } from './Reducers/User';
import { UserList } from './Components/UsersList/UserList';
import s from './App.module.scss';
import { CalculatorDragWrapper } from './Components/CalculatorDragWrapper/CalculatorDragWrapper';
import { Answer } from './Components/Answer/Answer';
import { Operations } from './Components/Operations/Operations';
import { Numbers } from './Components/Numbers/Numbers';
import { Equal } from './Components/Equal/Equal';
import { isTemplateMiddle } from 'typescript';
import { Placeholder } from './Components/Placeholder/Placeholder';
import { Toggle } from './Components/Toggle/Toggle';
import { useTypeSelector } from './Hooks/CustomUseSelector';
import { ChangeModeType, InitialCalculatorStateType } from './Reducers/Calculator';
type arrayElemetType = {
  component: JSX.Element,
  order: number,
  id: number
}
const App = React.memo(function () {
  console.log('app');

  const dispatch = useDispatch()
  const mode = useTypeSelector<InitialCalculatorStateType>(state => state.CalculatorReducer)
  const [element, setElement] = useState<arrayElemetType | null>(null)
  const [currentBoard, setCurrentBoard] = useState<arrayElemetType[] | null>(null)
  const isDragMode = mode.mode === ChangeModeType.DRAG_MODE


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

  function disableRightColumn(board: arrayElemetType[]) {
    if(board === secondCellElements) return false
    return true
  }

  function onDragStart(p: DragEvent<HTMLDivElement>, e: arrayElemetType, board: arrayElemetType[]) {
    if (!isDragMode || !disableRightColumn(board)) {
      p.preventDefault()
      return
    }
    setElement(e)
    setCurrentBoard(board)
  }

  function onDragOver(e: DragEvent<HTMLDivElement>, isPanel: boolean) {
    e.preventDefault()

    if (isPanel && (secondCellElements.length < 1) && element) e.currentTarget.classList.add(s.calculatorPanelWrapper__active)
  }

  function onDragOut(e: DragEvent<HTMLDivElement>, isPanel: boolean) {
    e.preventDefault()

    if (isPanel && (secondCellElements.length < 1) && element) e.currentTarget.classList.remove(s.calculatorPanelWrapper__active)
  }

  function onCellDrop(e: DragEvent<HTMLDivElement>, board: Array<arrayElemetType>, item: arrayElemetType) {
    e.preventDefault();
    e.stopPropagation()
    if (!element || !currentBoard) return
    let currentElemIndex = currentBoard.findIndex(t => t.id === element.id)
    let bottomElementIndex = board.findIndex(b => b.id === item.id)
    currentBoard.splice(currentElemIndex, 1)
    if (currentBoard === board) {
      board.splice(bottomElementIndex, 0, element)
    } else {
      board.splice(bottomElementIndex + 1, 0, element)
    }

    board === firstCellElements
      ? setFirstCellElements([...board])
      : setSecondCellElements([...board])

    currentBoard === firstCellElements
      ? setFirstCellElements([...currentBoard])
      : setSecondCellElements([...currentBoard])
    setElement(null)
  }

  function onBoardDrop(e: DragEvent<HTMLDivElement>, board: arrayElemetType[]) {
    if (!element || !currentBoard) return
    let currentElemIndex = currentBoard.findIndex(t => t.id === element.id)
    currentBoard.splice(currentElemIndex, 1)
    board === firstCellElements
      ? setFirstCellElements([...firstCellElements, element])
      : setSecondCellElements([...secondCellElements, element])

    currentBoard === firstCellElements
      ? setFirstCellElements([...currentBoard])
      : setSecondCellElements([...currentBoard])
    setElement(null)
  }

  function removeSegment(element: arrayElemetType) {
    if(!isDragMode) return
    let currentElemIndex = secondCellElements.findIndex(t => t.id === element.id)
    secondCellElements.splice(currentElemIndex, 1)
    firstCellElements.push(element)
    setSecondCellElements([...secondCellElements])
    setFirstCellElements(firstCellElements.sort((a: arrayElemetType, b: arrayElemetType) => a.order - b.order))
  }

  return (
    <div className={s.App}>
      <div className={s.main}>
      <div className={s.toggleBlock}>
        <Toggle />
      </div>
        <div className={s.calculatorWrapper}>
          <div className={s.calculatorSegments}>
            <CalculatorDragWrapper
              style={{ minHeight: '50px', height: '100%', minWidth: '240px', }}
              onDrop={(e: DragEvent<HTMLDivElement>) => onBoardDrop(e, firstCellElements)}
              onDragOver={function (e) { onDragOver(e, false); }}
            >
              {firstCellElements.map(e => (
                <div
                  draggable={isDragMode}
                  onDragStart={(p) => { onDragStart(p, e, firstCellElements) }}
                  onDrop={(c) => onCellDrop(c, firstCellElements, e)}
                  key={e.id}
                  data-id={e.order}
                >
                  <span className={isDragMode ? s.calculatorSegments__dragMode : ''}
                  >
                    {e.component}
                  </span>
                </div>
              ))}
            </CalculatorDragWrapper>
          </div>

          <div className={[s.calculatorPanelWrapper, (secondCellElements.length < 1 && s.dashedBoard)].join(' ')}>
            <CalculatorDragWrapper
              onDrop={(e: DragEvent<HTMLDivElement>) => onBoardDrop(e, secondCellElements)}
              onDragOver={function (e) { onDragOver(e, true); }}
              onDragLeave={function (e) { onDragOut(e, true); }}
              style={{ minHeight: '50px', minWidth: '50px', height: '100%' }}
              onMouseOut={(e: DragEvent<HTMLDivElement>) => { e.currentTarget.style.background = '' }}
              className={(secondCellElements.length < 1 ? s.calculatorWrapper__drag_wrapper : undefined)}
            >
              {secondCellElements.length > 0 && secondCellElements.map(e => <div
                draggable={isDragMode && disableRightColumn(secondCellElements)}
                className={(isDragMode && s.calculatorSegments__dragMode__visibility) || ''}
                onDragStart={(p) => { onDragStart(p, e, secondCellElements) }}
                onDoubleClick={() => removeSegment(e)}
                onDrop={(c) => onCellDrop(c, secondCellElements, e)}
                key={e.id}
                data-id={e.order}
              >
                <span
                  className={isDragMode ? s.calculatorSegments__dragMode : ''}
                >
                  {e.component}
                </span>
              </div>)}
              {
                secondCellElements.length < 1 && <Placeholder />
              }
            </CalculatorDragWrapper>
          </div>
        </div>
      </div>
    </div>
  );
})

export default App;
