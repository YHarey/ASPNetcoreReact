export interface BasketItem {
    productId: number;
    name: string;
    price: number;
    brand: string;
    pictureUrl: string;
    productType: string;
    quantity: number;
}

export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
}