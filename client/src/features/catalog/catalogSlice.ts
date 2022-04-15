import { createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";

const productsAdapter = createEntityAdapter<Product>();
export const fetchProductsAsync = createAsyncThunk