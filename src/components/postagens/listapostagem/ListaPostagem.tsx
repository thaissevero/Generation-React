import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

import './ListaPostagem.css';

function ListaPostagem() {
    const [postagens, setPostagens] = useState<Postagem[]>([])

    let navigate = useNavigate();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    useEffect(() => {
        if (token == "") {
            toast.error("Você precisa estar logado", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "dark",
                progress: undefined,
            });
            navigate("/login");
        }
    }, [token]);

    async function getPostagem() {
        await busca('/postagens', setPostagens, {
            headers: {
                'Authorization': token
            }
        })
    }
    useEffect(() => {
        getPostagem()
    }, [postagens.length])

    return (
        <>
            <div className='div-posts'>
                {
                    postagens.map(postagem => (
                        <Box m={2}>
                            <Card className='cardpostagens' >
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Postagem
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {postagem.titulo}
                                        <Typography variant="body2" component="p">
                                            {postagem.texto}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {postagem.tema?.descricao}
                                        </Typography>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Box display="flex" justifyContent="center" mb={1.5} >
                                        <Link to={`/formularioPostagem/${postagem.id}`} className="text-decorator-none">
                                            <Box mx={1}>
                                                <Button variant="contained" size='small' color='primary' className="botao3" >
                                                    atualizar
                                                </Button>
                                            </Box>
                                        </Link>
                                        <Link to={`/deletarPostagem/${postagem.id}`} className="text-decorator-none">
                                            <Box mx={1}>
                                                <Button variant="contained" size='small' color="secondary" className="botao3">
                                                    deletar
                                                </Button>
                                            </Box>
                                        </Link>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Box>
                    ))
                }
            </div>
        </>
    );
}

export default ListaPostagem;