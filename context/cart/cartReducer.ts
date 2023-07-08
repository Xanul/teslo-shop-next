import { ICartProduct } from '@/interfaces';
import { CartState } from './';

type cartActionType = 
  | { type: 'CART - LoadCart from cookies | storage', payload: ICartProduct[] }
  | { type: 'CART - Add Product', payload: ICartProduct }

// The reducer cannot modify the state, it must retrun a new state 
export const cartReducer = (state: CartState, action: cartActionType):CartState => {
  
  switch (action.type) {
    case 'CART - LoadCart from cookies | storage':
      return {
        ...state,
      }

    default:
      return state;
  }
}