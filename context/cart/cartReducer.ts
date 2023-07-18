import { ICartProduct } from '@/interfaces';
import { CartState } from './';

type cartActionType = 
  | { type: 'CART - LoadCart from cookies | storage', payload: ICartProduct[] }
  | { type: 'CART - Update products in cart', payload: ICartProduct[] }
  | { type: 'CART - Change product quantity', payload: ICartProduct }

// The reducer cannot modify the state, it must retrun a new state 
export const cartReducer = (state: CartState, action: cartActionType):CartState => {
  
  switch (action.type) {
    case 'CART - LoadCart from cookies | storage':
      return {
        ...state,
        cart: [...action.payload]
      }
    case 'CART - Update products in cart':
      return {
        ...state,
        cart: [...action.payload]
      }

    case 'CART - Change product quantity':
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item._id !== action.payload._id) return item
          if (item.size !== action.payload.size) return item

          return action.payload
        })
      }

    default:
      return state;
  }
}