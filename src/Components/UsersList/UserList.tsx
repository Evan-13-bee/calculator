import React from "react";
import { FC } from "react";
import { IUser } from "../../types/types";


interface UserListProps {
  users: IUser[]
}

export const UserList: FC<UserListProps> = React.memo(function ({ users }) {
  console.log('userList');

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          {user.id}. {user.name} проживает в городе {user.address.city}
        </div>)
      )}
    </div>
  )
})