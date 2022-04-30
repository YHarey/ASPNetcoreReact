export interface MetaData {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItemCnt: number;
}

//for class we need to specify the value for the Property
//for interface we don't have to
export class PaginatedResponse<T> {
    items: T;
    metaData: MetaData;

    constructor(items: T, metaData: MetaData) {
        this.items = items;
        this.metaData = metaData;
    }
}