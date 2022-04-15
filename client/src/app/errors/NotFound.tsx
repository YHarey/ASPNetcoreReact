import { Button, Container, Divider, Link, Paper, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function NotFound() {
    const history = useHistory();
  
    const catalogPage = () => {
        history.push("/catalog")
    }
    return (
        <Container component={Paper} sx={{height: 400}}>
            <Typography gutterBottom variant="h3">
                Oops - We could not find what you are looking for
            </Typography>
            <Divider />
            <Button fullWidth onClick={catalogPage}>Back To Home</Button>
        </Container>
    )
}