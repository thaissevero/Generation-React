import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'; //chaves para mostrar que tem mais de um item
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';
import { Palette } from '@mui/icons-material';


function Navbar() {
    let navigate = useNavigate();

    const token = useSelector<TokenState, TokenState['tokens']>(
        (state) => state.tokens
    );

    const dispatch = useDispatch();

    function goLogout() {
        dispatch(addToken(""));
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: 'colored',
            progress: undefined,
        })
        navigate("/login")
    }

    var navbarComponent;

    if (token !== "") {
        navbarComponent = (
            <AppBar position="static">
                <Toolbar variant="dense" className="navbar">
                    <div className='itemnavbar1'>
                        <Box display="flex" justifyContent="start" style={{ cursor: 'pointer' }}>
                            <Link to="/home" className="text-decorator-none">
                                <Box mx={1} className='cursor'>
                                    <img src="https://i.imgur.com/RYeg0cs.gif" width="100px" height="100px" />
                                </Box>
                            </Link>
                        </Box>
                    </div>
                    <div className='itemnavbar2'>
                        <Box display="flex" justifyContent="start">
                            <Link to="/home" className="text-decorator-none">
                                <Box mx={1} className='cursor'>
                                    <Typography variant="h6" color="inherit">
                                        MY BLOG
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    </div>

                    <div className="itemnavbar">
                        <Box display="flex" justifyContent="start">
                            <Link to="/home" className="text-decorator-none">
                                <Box mx={3} className='cursor'>
                                    <Typography variant="h6" color="inherit">
                                        HOME
                                    </Typography>
                                </Box>
                            </Link>
                            <Link to="/posts" className="text-decorator-none">
                                <Box mx={3} className='cursor'>
                                    <Typography variant="h6" color="inherit">
                                        POSTS
                                    </Typography>
                                </Box>
                            </Link>
                            <Link to="/temas" className="text-decorator-none">
                                <Box mx={3} className='cursor'>
                                    <Typography variant="h6" color="inherit">
                                        TOPICS
                                    </Typography>
                                </Box>
                            </Link>
                            <Link to="/formularioTema" className="text-decorator-none">
                                <Box mx={3} className='cursor'>
                                    <Typography variant="h6" color="inherit">
                                        NEW TOPICS
                                    </Typography>
                                </Box>
                            </Link>
                            <Box mx={3} className='cursor' onClick={goLogout}>
                                <Typography variant="h6" color="inherit">
                                    LOGOUT
                                </Typography>
                            </Box>
                        </Box>
                    </div>
                </Toolbar>
            </AppBar >
        );
    }

    return (
        <>
            {navbarComponent}
        </>
    );
}

export default Navbar;

/**            
position    - Posição da onde esse post vai aparecer
autoClose   - Em que momento essa notificação deve sumir
hideProgressBar - Se precisa ou não ocultar a barra de progresso (se colocasse true ela não apareceria)
closeOnClick    - Poder fechar a notificação com um clico no 'x'
pauseOnHover    - Se passar o mouse por cima dela, ela irá pausar
draggable   - Mover a notificação de local
theme   - tema de como o alerta deverá ser exibido
*/