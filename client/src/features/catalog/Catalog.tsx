import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../app/components/AppPagination";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  //priceDesc these names should match variables in ProductExtensions.cs
  {value: 'priceDesc', label: 'Price - High to low'},
  {value: 'price', label: 'Price - Low to high'},

]
export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status, filtersLoaded, prodBrands, 
      prodTypes, productParams, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    //if we use this both products and filters in one useEfect, 
    //the products will be called twice on the API, so we split it into two
    // useEffect(()=> {
    //   if (!productsLoaded) dispatch(fetchProductsAsync());
    //   if (!filtersLoaded) dispatch(fetchFilters());
    //   },[productsLoaded, dispatch, filtersLoaded]);
      
  useEffect(()=> {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);
  
  useEffect(()=> {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);


  if (!filtersLoaded) return <LoadingComponent message="...Loading Products..."/>

    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
              <Paper sx={{mb: 2}}>
                  <ProductSearch />
              </Paper>
              <Paper sx={{mb: 2, p: 2}}>
                  <RadioButtonGroup 
                      selectedValue={productParams.orderBy}
                      options={sortOptions}
                      onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                  />
              </Paper>
              <Paper sx={{mb: 2, p: 2}}>
                  <CheckboxButtons 
                    items={prodBrands}
                    checked={productParams.prodBrands}
                    onChange={(items: string[]) => dispatch(setProductParams({prodBrands: items}))}
                  />
              </Paper>
              <Paper sx={{mb: 2, p: 2}}>
              <CheckboxButtons 
                    items={prodTypes}
                    checked={productParams.prodTypes}
                    onChange={(items: string[]) => dispatch(setProductParams({prodTypes: items}))}
                  />
              </Paper>
            </Grid>
            <Grid item xs={9}>
            <ProductList products={products}></ProductList>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{mt:2,mb:2}}>
                {metaData && 
                <AppPagination 
                metaData={metaData}
                onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                />
                }
                
            </Grid>
        
        </Grid>
    )
}


