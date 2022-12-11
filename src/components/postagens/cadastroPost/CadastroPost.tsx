import React, { ChangeEvent, useEffect, useState } from "react";
import { Container, Typography, TextField, Button, FormControl, Select, InputLabel, FormHelperText, MenuItem } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import Postagem from "../../../models/Postagem";
import { busca, buscaId, post, put } from "../../../services/Service";
import './CadastroPost.css';
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";


function CadastroPost() {
    let navigate = useNavigate();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens);

    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([]);

    useEffect(() => {
        if (token === '') {
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
            navigate('/login');
        }
    }, [token]);

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    });

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null
    });

    function updateModel(event: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [event.target.name]: event.target.value,
            tema: tema
        });
    }

    async function buscaTema() {
        await busca("/temas", setTemas, {
            headers: {
                Authorization: token,
            },
        });
    }

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        });
    }, [tema]);

    async function findByIdPostagem(id: string) {
        await buscaId(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token,
            },
        });
    }

    useEffect(() => {
        buscaTema();
        if (id !== undefined) {
            findByIdPostagem(id);
        }
    }, [id]);

    async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    Authorization: token,
                },
            });
            toast.success("Postagem atualizada com sucesso!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "dark",
                progress: undefined,
            });
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    Authorization: token,
                },
            });
            toast.success("Postagem cadastrada com sucesso!", {
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
        back();
    }

    function back() {
        navigate("/posts");
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={cadastrar}>
                <Typography variant="h4" color="textSecondary" component="h1" align="center" className="textoatualizar">
                    Formulário: cadastrar/atualizar postagem
                </Typography>
                <TextField
                    value={postagem.titulo}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}

                    id="titulo"
                    label="titulo"
                    variant="outlined"
                    name="titulo"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id='texto'
                    value={postagem.texto}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                    label="texto"
                    name="texto"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    multiline
                    minRows={4}
                />

                <FormControl fullWidth>
                    <InputLabel id="temaSelect"> Tema </InputLabel>
                    <Select
                        labelId="temaSelect"
                        id="tema"
                        onChange={(e) =>
                            buscaId(`/temas/${e.target.value}`, setTema, {
                                headers: {
                                    Authorization: token,
                                },
                            })
                        }>

                        {temas.map((tema) => (
                            <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                        ))}
                    </Select>

                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" color="primary" className="btnovopost" disabled={tema.id === 0}>
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    );
}
export default CadastroPost;

/** 
multiline minrow deixa o form com mais espaço para o campo de texto
*/