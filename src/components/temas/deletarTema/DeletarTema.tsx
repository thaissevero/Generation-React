import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Tema from '../../../models/Tema';
import './DeletarTema.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function DeletarTema() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [tema, setTema] = useState<Tema>()

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
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id]);

    async function findById(id: string) {
        await buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token,
            }
        })
    }

    async function sim() {
        navigate('/temas')
        await deleteId(`/temas/${tema?.id}`, {
            headers: {
                Authorization: token
            }
        });
        toast.success("Tema deletado com sucesso!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "dark",
            progress: undefined,
        });
    }

    function nao() {
        navigate('/temas')
    }

    return (
        <div className='container'>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography>Deseja deletar o tema:</Typography>
                            <Typography color="textSecondary">Tema {tema?.id} - {tema?.descricao}</Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="center" gap={2}>
                            <Button variant="contained" size="large" color="secondary" onClick={nao}>
                                Não
                            </Button>
                            <Button variant="contained" size="large" color="primary" onClick={sim} >
                                Sim
                            </Button>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </div>
    );
}

export default DeletarTema;