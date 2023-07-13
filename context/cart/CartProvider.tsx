import React, { FC, PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';
import Cookie from 'js-cookie';

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: []
}

export const CartProvider:FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    
    try {
      const productsInCookies = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
      dispatch({type: 'CART - LoadCart from cookies | storage', payload: productsInCookies})
    } catch(error) {
      dispatch({type: 'CART - LoadCart from cookies | storage', payload: []})
    }
    
    
  }, [])
  

  useEffect(() => {
    Cookie.set('cart', JSON.stringify( state.cart ));
  }, [state.cart]);


  

  const addProductToCart = (product: ICartProduct) => {

    const productInCart = state.cart.some( item => item._id ===  product._id)
    if ( !productInCart ) return dispatch({type: 'CART - Update products in cart', payload: [...state.cart, product]})

    const productInCartButDifferentSize = state.cart.some( item => item.size === product.size )
    if ( !productInCartButDifferentSize ) return dispatch({type: 'CART - Update products in cart', payload: [...state.cart, product]})

    const updatedProducts = state.cart.map( item => {

      if (item._id !== product._id) return item;
      if (item.size !== product.size) return item;

      item.quantity += product.quantity;
      
      return item

    })
    
    dispatch({type: 'CART - Update products in cart', payload: updatedProducts})

  }

  return (
    <CartContext.Provider value={{
      ...state,

      // Methods
      addProductToCart
    }}>
      { children }
    </CartContext.Provider>
  )
}