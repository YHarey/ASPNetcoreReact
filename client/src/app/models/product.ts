export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl?: string;
    productType?: string;
    brand?: string;
    quantityInStock?: number;
}

export interface ProductParams {
    orderBy: string;
    searchTxt?: string;
    prodBrands?: string[];
    prodTypes?: string[];
    pageNumber: number;
    pageSize: number;
}


