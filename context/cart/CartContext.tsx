import { ICartProduct } from "@/interfaces";
import { createContext, useContext } from "react";

interface ContextProps {
  cart: ICartProduct[];
}



export const CartContext = createContext({} as ContextProps);
