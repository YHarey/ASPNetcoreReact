import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import { Product } from "../models/product";
import Header from "./header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";


function App() {
const dispatch = useAppDispatch();
const [loading, setLoading] = useState(true);

useEffect(() => {
  const buyerId = getCookie('buyerId');
  if (buyerId) {
    agent.Basket.get()
    //setBasket is from basketSlice
    .then(basket => dispatch(setBasket(basket)))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  } else
  {
    setLoading(false);
  }
}, [dispatch])

  const [darkMode, setDarkMode] = useState(false);
  //if darkMode is true then dark
  const paletteType = darkMode? 'dark' : 'light'
  const theme= createTheme({
    palette:{mode:paletteType}
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  if (loading) return <LoadingComponent message="Initilizing App..." />
  
  return (
    <ThemeProvider theme={theme}>
    <ToastContainer position='top-right' theme="colored" />
    <CssBaseline/>
    <Header darkMode={darkMode}  handleThemeChange={handleThemeChange}/>
    <Container>
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/catalog' component={Catalog} />
      <Route path='/catalog/:id' component={ProductDetails} />
      <Route path='/about' component={AboutPage} />
      <Route path='/contact' component={ContactPage} />
      <Route path='/server-error' component={ServerError} />
      <Route path='/basket' component={BasketPage} />
      <Route path='/checkout' component={CheckoutPage} />
      {/* If none of the above routes match, it goes to Not Found */}
      <Route component={NotFound} />
      </Switch>
    
    </Container>
    </ThemeProvider>
  );
}

export default App;
