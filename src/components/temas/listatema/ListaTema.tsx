import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import Tema from '../../../models/Tema';
import './ListaTema.css';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaTema() {
    const [temas, setTemas] = useState<Tema[]>([])
    let navigate = useNavigate();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens);

    useEffect(() => {
        if (token == '') {
            toast.error("Você precisa estar logado!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "dark",
                progress: undefined,
            });
            navigate("/login")
        }
    }, [token])

    async function getTema() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }
    useEffect(() => {
        getTema()
    }, [temas.length])

    return (
        <>
            <div className="todos-temas">
                {
                    temas.map(tema => (
                        <div className="div-tema">
                            <Box m={10}>
                                <Card className="cardtema">
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            Tema
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {tema.descricao}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Box display="flex" justifyContent="start" mb={1.5} >
                                            <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                                                <Box mx={1}>
                                                    <Button variant="contained" className="botao3" size='small' color='primary'>
                                                        atualizar
                                                    </Button>
                                                </Box>
                                            </Link>
                                            <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                                                <Box mx={1}>
                                                    <Button variant="contained" className="botao3" size='small' color="secondary">
                                                        deletar
                                                    </Button>
                                                </Box>
                                            </Link>
                                        </Box>
                                    </CardActions>
                                </Card>
                            </Box>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default ListaTema;