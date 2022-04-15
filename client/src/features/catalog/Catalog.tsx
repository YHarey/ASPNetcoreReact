import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";
import { isPropertySignature } from "typescript";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

interface Props {
    products: Product[];
}
export default function Catalog() {
    const [products , setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(()=> {
    agent.Catalog.list()
    .then(products => setProducts(products))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  },[]);

  if (loading) return <LoadingComponent message="...Loading Products..."/>

    return (
        <>
        <ProductList products={products}></ProductList>
        </>
    )
}
