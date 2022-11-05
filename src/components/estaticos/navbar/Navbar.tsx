import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'; //chaves para mostrar que tem mais de um item
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Box style={{ cursor: 'pointer' }}>
                        <Typography variant="h5" color="inherit">
                            BlogPessoal
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="start">
                        <Box mx={1} style={{ cursor: 'pointer' }}>
                            <Typography variant="h6" color="inherit">
                                Home
                            </Typography>
                        </Box>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Postagens
                            </Typography>
                        </Box>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Temas
                            </Typography>
                        </Box>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Cadastrar tema
                            </Typography>
                        </Box>
                        <Link to='/login' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Logout
                            </Typography>
                        </Box>
                        </Link>                        
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;