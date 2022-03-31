import React, { ChangeEventHandler, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Main, Variant } from './Components/Main';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName, updateUserNameTC } from './Actions/UserAC';
import { AppRootStateType } from './Store/store';
import { InitialStateType } from './Reducers/User';
import { UserList } from './Components/UserList';

const App = React.memo(function () {
  console.log('app');

  const dispatch = useDispatch()
  const usersState = useSelector<AppRootStateType, InitialStateType>(state => state.UserReducer)
  const [num, setNum] = useState<number>(0)

  function changeNum(e: string) {
    dispatch(updateUserNameTC(e))
  }
  return (
    <div className="App">
      <header className="App-header">
        <Main
          article={usersState.userName}
          setArticle={changeNum}
          variant={Variant.foo}
        >
        </Main>
        <UserList
          users={usersState.usersList}
        />
      </header>
    </div>
  );
})

export default App;
