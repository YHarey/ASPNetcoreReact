import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSearch() {
    const {productParams} = useAppSelector(state => state.catalog);
    const [searchTxt, setSearchTxt] = useState(productParams.searchTxt);
    const dispatch = useAppDispatch();
    // wait for a sec for user to enter search txt
    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTxt: event.target.value}))
    }, 1000)

    return (
        <TextField 
            label='Search products'
            variant="outlined"
            fullWidth
            value={searchTxt || ''}
            onChange={(event: any) => {
                setSearchTxt(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}