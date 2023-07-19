import React, { FC, PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';
import Cookie from 'js-cookie';

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  taxRate: 0,
  total: 0,
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

  useEffect(() => {
    
    const numberOfItems = state.cart.reduce((acc, current) => acc + current.quantity,0)
    const subTotal = state.cart.reduce((acc, current) => acc + current.price * current.quantity, 0)
    const tax = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const taxRate = subTotal * tax;
    const total = subTotal + taxRate

    const orderSummary = {
      numberOfItems,
      subTotal,
      taxRate,
      total
    }

    dispatch({type: 'CART - Update order summary', payload: orderSummary})
    

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

  const removeCartProduct = ( product: ICartProduct ) => {
    dispatch({type: 'CART - Remove product in cart', payload: product})
  }

  const updateCartQuantity = ( product: ICartProduct ) => {
    dispatch({type: 'CART - Change product quantity', payload: product})
  }

  return (
    <CartContext.Provider value={{
      ...state,

      // Methods
      addProductToCart,
      updateCartQuantity,
      removeCartProduct
    }}>
      { children }
    </CartContext.Provider>
  )
}