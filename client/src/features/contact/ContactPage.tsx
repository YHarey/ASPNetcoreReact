import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";


export default function ContactPage(){
    const dispatch = useAppDispatch();
    //use hook useSelector
    const {data, title} = useAppSelector(state => state.counter);
    
    return (
        <>
            <Typography variant="h2">
            {title}
            </Typography>
            <Typography variant="h5">
            The data is: {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrement(1))} 
                variant='contained' color='error' >Decrement</Button>
                <Button onClick={() => dispatch(increment(1))} 
                variant='contained' color='success' >Increment</Button>
            </ButtonGroup>
            <br></br>
            <br></br>
            <ButtonGroup>
                <Button onClick={() => dispatch(increment(5))} 
                variant='contained' color='secondary' >Increment By 5</Button>
                <Button onClick={() => dispatch(decrement(5))} 
                variant='contained' color='primary' >Decrement By 5</Button>
            </ButtonGroup>
        </>
       
    )
}