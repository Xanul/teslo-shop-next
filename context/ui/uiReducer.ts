import { UiState } from './';

type UiActionType = 
  | { type: 'UI - ToggleMenu' }

// The reducer cannot modify the state, it must retrun a new state 
export const uiReducer = (state: UiState, action: UiActionType):UiState => {
  
  switch (action.type) {
    case 'UI - ToggleMenu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      }

    default:
      return state;
  }
}