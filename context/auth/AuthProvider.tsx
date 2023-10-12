import { FC, PropsWithChildren, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '../../interfaces/user';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider:FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  return (
    <AuthContext.Provider value={{
      ...state
      //Methods
      

    }}>
      { children }
    </AuthContext.Provider>
  )

}