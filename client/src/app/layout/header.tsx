import { ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configureStore";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'}
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'}
]

const navStyles = {
    color: 'inherit', 
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'yellow'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header({darkMode, handleThemeChange}: Props) {
    const {basket} = useAppSelector(state => state.basket);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box display='flex' alignItems='center'>
                <Typography variant="h4" component={NavLink} to='/' 
                exact
                sx={navStyles}>
                    Harey React
                </Typography>
                <Switch checked={darkMode} onClick={handleThemeChange} />
                </Box>
                

                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem
                        component={NavLink}
                        to={path}
                        key={path}
                        sx={navStyles}
                    >
                    {title.toUpperCase()} 
                    </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>
                    {/* color inherit means white same as others  */}
                <IconButton component={Link} to='/basket' size="large" sx={{color: 'inherit'}}>
                    <Badge badgeContent={itemCount} color='secondary'>
                        <ShoppingCart/>
                    </Badge>
                </IconButton>

                <List sx={{display: 'flex'}}>
                    {rightLinks.map(({title, path}) => (
                        <ListItem
                        component={NavLink}
                        to={path}
                        key={path}
                        sx={navStyles}
                    >
                    {title.toUpperCase()} 
                    </ListItem>
                    ))}
                </List>
                </Box>

                

            </Toolbar>
        </AppBar>
    )
}