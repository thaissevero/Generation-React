import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'; //chaves para mostrar que tem mais de um item
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import {toast} from 'react-toastify';


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
            <Toolbar variant="dense">
                <Box style={{ cursor: 'pointer' }}>
                    <Typography variant="h5" color="inherit">
                        BlogPessoal
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="start">
                    <Link to="/home" className="text-decorator-none">
                        <Box mx={1} style={{ cursor: 'pointer' }}>
                            <Typography variant="h6" color="inherit">
                                Home
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/posts" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Postagens
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/temas" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Temas
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/formularioTema" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Cadastrar tema
                            </Typography>
                        </Box>
                    </Link>
                    <Box mx={1} className='cursor' onClick={goLogout}>
                        <Typography variant="h6" color="inherit">
                            Logout
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
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