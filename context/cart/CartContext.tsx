import { ICartProduct } from "@/interfaces";
import { createContext, useContext } from "react";

interface ContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;
  
  // Methods
  addProductToCart: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  removeCartProduct: (product: ICartProduct) => void
}



export const CartContext = createContext({} as ContextProps);
