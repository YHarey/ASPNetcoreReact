import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaData } from "../../app/models/pagination";
import { Product, ProductParams } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    prodBrands: string[];
    prodTypes: string[];
    productParams: ProductParams;
    metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    //these need to match productParams in API
    params.append('PageNumber',productParams.pageNumber.toString());
    params.append('PageSize',productParams.pageSize.toString());
    params.append('orderBy',productParams.orderBy.toString());
    if (productParams.searchTxt) params.append('searchTxt',productParams.searchTxt);
    if (productParams.prodBrands.length>0) params.append('prodBrands',productParams.prodBrands.toString());
    if (productParams.prodTypes.length>0) params.append('prodTypes',productParams.prodTypes.toString());
    return params;
}


//returns Product[] array and async () this method does not take any parameters
export const fetchProductsAsync = createAsyncThunk<Product[],void, {state: RootState}>(
    'catalog/fetchProductAsync',
    //here we are using as _ underscore as empty or void parameter
    //as thunkAPI should be 2nd parameter
    async (_ , thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try {
             const response = await agent.Catalog.list(params);
             thunkAPI.dispatch(setMetaData(response.metaData));
             return response.items;
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchSingleProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchSingleProductAsync',
    async (productId, thunkAPI) => {
        try {
             return await agent.Catalog.details(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_ , thunkAPI) => {
        try {
            return agent.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        prodBrands: [],
        prodTypes: [],
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState> ({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        prodBrands: [],
        prodTypes: [],
        productParams: initParams(),
        metaData: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload, pageNumber: 1};
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload};
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetProductParams: (state) => {
            state.productParams =  initParams();
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchSingleProductAsync.pending, (state) => {
            state.status = 'pendingFetchSingleProduct';
        });
        builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            //public async Task<IActionResult> GetFilters()
            //prodBrands and prodTypes are varableNames u declared in ProductsController
            state.prodBrands = action.payload.prodBrands;
            state.prodTypes = action.payload.prodTypes;
            state.filtersLoaded=true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state,action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})
//productSelectors can be used to get data from store
export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)

export const {setProductParams, resetProductParams, setMetaData, setPageNumber} = catalogSlice.actions;