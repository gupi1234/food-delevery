import { createContext, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (item) => {
    if (!cartItems[item]) {
      setCartItems((prev) => ({ ...prev, [item]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [item]: prev[item] + 1 }));
    }
  };

  const removeFromCart = (item) => {
    setCartItems((prev) => ({ ...prev, [item]: prev[item] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = food_list.find((food) => food._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * 20 * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
