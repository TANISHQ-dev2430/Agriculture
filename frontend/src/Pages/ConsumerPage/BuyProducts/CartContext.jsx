import React, { createContext, useState } from 'react';

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {}
});

export const CartContextProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState({ items: [] });

  const addItemToCart = (product) => {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === product.id);
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...product, quantity: 1 });
      }

      return { items: updatedItems };
    });
  };

  const updateItemQuantity = (productId, amount) => {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex((item) => item.id === productId);
      const updatedItem = { ...updatedItems[updatedItemIndex] };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return { items: updatedItems };
    });
  };

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart,
    updateItemQuantity
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
};