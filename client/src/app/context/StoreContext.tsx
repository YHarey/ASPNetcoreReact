import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    //basket variable can be of type Basket or null
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    //this will take productId & quantity variables with type number and return void
    removeItem: (prodictId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);
//our own custom react hook
export function useStoreContext() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw Error('Oops - Not inside the Provider')
    }
    return context;
}

export function StoreProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);
    function removeItem(productId: number, quantity: number){
        if (!basket) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            //if qty 0, just remove item
            if (items[itemIndex].quantity === 0) items.splice(itemIndex,1);
            setBasket(prevState => {
                return {...prevState!, items}
            })
        }
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}
