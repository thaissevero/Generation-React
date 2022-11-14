import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, TextField, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import { buscaId, put, post } from '../../../services/Service';


function CadastroTema() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [token] = useLocalStorage("token");

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: '',
    });
    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado");
            navigate("/login");
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            findById(id);
        }
    }, [id]);

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        });
    }

    function updatedTema(event: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [event.target.name]: event.target.value,
        });
    }

    async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        if (id !== undefined) {
            console.log(tema);
            put(`/temas`, tema, setTema, {
                headers: {
                    Authorization: token,
                },
            });
            alert("Tema atualizado com sucesso");
        } else {
            post(`/temas`, tema, setTema, {
                headers: {
                    Authorization: token,
                },
            });
            alert("Tema cadastrado com sucesso");
        }
        Back();
    }

    function Back() {
        navigate("/temas");
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={cadastrar}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center">
                    Formulário de cadastro tema
                </Typography>

                <TextField
                    value={tema.descricao}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => updatedTema(event)}
                    id="descricao"
                    variant="outlined"
                    name="descricao"
                    margin="normal"
                    fullWidth
                    label="Descrição" />

                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    );
}

export default CadastroTema;

/** 📚 significados dos termos usados:

!== - Diferente

put - vai informar a rota (no caso é rota do nosso API e não blog) nesse caso, 
passar a rota do API para fazer atualização "/tema", 
"tema" os dados que prentendemos cadastrar,"setTema" capturar os dados que a API retornar. 

post - esse método é a mesma coisa que o anterior (no caso, o put).

updatedTema - Gera um evento que quando o usuário digitar, vai ser guardado, 
assim ele vai guardar todas as informações para enviar para o back-end.

back - vai nos retornar para onde tem todos os temas cadastrados;
*/