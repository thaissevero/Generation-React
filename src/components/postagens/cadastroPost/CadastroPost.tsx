import React, { ChangeEvent, useEffect, useState } from "react";
import { Container, Typography, TextField, Button, FormControl, Select, InputLabel, FormHelperText, MenuItem } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import Tema from "../../../models/Tema";
import Postagem from "../../../models/Postagem";
import { busca, buscaId, post, put } from "../../../services/Service";
import './CadastroPost.css';


function CadastroPost() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([]);
    const [token, setToken] = useLocalStorage('token');

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado pra fazer isso!');
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
            try {
                await put("/postagens", postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                alert("Postagem atualizada com sucesso");
            } catch (error) {
                alert("Falha ao atualizar a postagem");
            }
        } else {
            try {
                await post("/postagens", postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                alert("postagem feita com sucesso");
            } catch (error) {
                alert("Falha ao cadastrar a postagem");
            }
        }
        back();
    }

    function back() {
        navigate("/posts");
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={cadastrar}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center">
                    Formulário de cadastro de postagem
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

                <FormControl>
                    <InputLabel id="temaSelect">Tema </InputLabel>
                    <Select
                        labelId="temaSelect"
                        id="tema"
                        onChange={(e) =>
                            buscaId(`/temas/${e.target.value}`, setTema, {
                                headers: {
                                    Authorization: token,
                                },
                            })
                        }
                    >
                        {temas.map((tema) => (
                            <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={tema.id === 0}
                    >
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    );
}
export default CadastroPost;