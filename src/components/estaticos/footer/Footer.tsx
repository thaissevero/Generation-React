import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './Footer.css';

function Footer() {

    const token = useSelector<TokenState, TokenState['tokens']>(
        (state) => state.tokens
    );

    var footerComponent;

    if (token !== "") {
        footerComponent =
            <footer>
                <hr />
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid alignItems="center" item xs={12}>
                        <Box className='box1'>
                            <Box paddingTop={1}>
                                <Typography variant="subtitle2" align="center" gutterBottom className='textosfooter'>
                                    Copyright © 2022 Thais Severo
                                </Typography>
                            </Box>
                            <Box>
                                <a target="_blank" href="https://brasil.generation.org" className="text-decorator-none">
                                    <Typography variant="subtitle2" gutterBottom className="textosfooter1" align="center"> brasil.generation.org </Typography>
                                </a>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </footer>
    }
    return (
        <>
            {footerComponent}
        </>
    );
}

export default Footer;