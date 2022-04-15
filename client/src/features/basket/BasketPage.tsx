import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
        
    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return (
      <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{backgroundColor: '#1976d2',  }}>
              <TableCell sx={{fontSize: '16px', color: 'white'}}>Product</TableCell>
              <TableCell sx={{fontSize: '16px',color: 'white'}} align="right">Price</TableCell>
              <TableCell sx={{fontSize: '16px',color: 'white'}} align="center">Quantity</TableCell>
              <TableCell sx={{fontSize: '16px',color: 'white'}} align="right">Subtotal</TableCell>
              <TableCell sx={{fontSize: '16px',color: 'white'}} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center' >
                  <a href={`/catalog/${item.productId}`}>
                      <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}} />
                      
                  </a>
                  <a href={`/catalog/${item.productId}`}>
                      <span>{item.name}</span>
                  </a>
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                <TableCell align="center">
                  <LoadingButton 
                    loading={status === 'pendingRemoveItem' + item.productId + 'rem'} 
                    onClick={() => dispatch(removeBasketItemAsync({
                      productId: item.productId, quantity: 1, name: 'rem'
                    }))} 
                    color="error">
                    <Remove/>
                    </LoadingButton>
                  {item.quantity}
                  <LoadingButton 
                  loading={status === ('pendingAddItem' + item.productId)} 
                  onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))} 
                  color="secondary">
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                <TableCell align="right">
                    <LoadingButton 
                      loading={status === 'pendingRemoveItem' + item.productId + 'del'} 
                      onClick={() => dispatch(removeBasketItemAsync({
                        productId: item.productId, quantity: item.quantity, name: 'del'
                      }))} 
                      color="error">
                            <Delete />
                    </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                  <BasketSummary />
                  <Button component={Link}
                  to='/checkout' variant='contained' 
                  size='large' fullWidth>
                      Checkout
                  </Button>
              </Grid>
      </Grid>
      </>
        
    )
    
}