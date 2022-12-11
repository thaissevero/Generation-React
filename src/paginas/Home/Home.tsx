import React, { useEffect } from "react";
import "./Home.css";
import { Typography, Grid, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import TabPostagem from "../../components/postagens/tabpostagem/TabPostagem";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function Home() {
    let navigate = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token == "") {
            toast.error('Você precisa estar logado!', {
                position: "top-right", 
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            })
            navigate("/login");
        }
    }, [token]);

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20}>
                        <Typography variant="h4" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'> You're welcome! </Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'> Be nice or go away </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem />
                        </Box>
                        <Link to='/posts' className='text-decorator-none'>
                            <Button variant="outlined" className='botao'> see all posts </Button> 
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <img src="https://64.media.tumblr.com/890df6164cd6549c841e4cdf08866be5/476b8c536f2b0bc5-76/s400x600/e2202a9abeaed5237be4b6e73c1b30b0be6b5021.gif" width="500px" height="500px" />
                </Grid>
                <Grid xs={12} className='postagens'>
                    <TabPostagem />
                </Grid>
            </Grid>
        </>
    )
}

export default Home;