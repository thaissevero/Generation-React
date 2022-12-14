import React, { useState, ChangeEvent, useEffect } from "react";
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Service";
import UserLogin from "../../models/UserLogin";
import './Login.css';
import { useDispatch } from "react-redux";
import { addToken } from "../../store/tokens/actions";
import { toast } from "react-toastify";

function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        token: '',
    }
    )

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token != '') {
            dispatch(addToken(token))
            navigate('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/usuarios/logar`, userLogin, setToken)
            toast.success("Usuário logado com sucesso!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "dark",
                progress: undefined,
            });

        } catch (error) {
            toast.error('Dados do usuário inconsistentes. Erro ao logar!', {
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
    }
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={15}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className="textos1"> Acesse sua conta! </Typography>
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary' className="botao">
                                Entrar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={3}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'> Não tem uma conta? </Typography>
                        </Box>
                        <Link to='/cadastrousuario' className="cadastrouser">
                            <Typography variant='subtitle1' gutterBottom align='center'> Cadastre-se </Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='imagem'>
            </Grid>
        </Grid>
    );
}

export default Login;

/** Anotações dos significados dos conceitos usados:
userLogin = acessar a informação do state/estado do componente.
setUserLogin = alterar o estado/informação desse componente.
updatedModel = responsavel por fazer atualização da nossa model, ou seja, ele trabalha junto com o userLogin e o setUserLogin.
e: = evento
ChangeEvent = alteração, nesse caso alteração no: HTMLInputElement.
... = Espalhar todos os atributos que tem dentro, no caso: id, nome, usuario, senha etc.

variant = define o estilo da letra.
gutterBottom = margem inferior.
Primary = é a cor padrão.
component = algo como "reforçar" a tag h3.
type='password' = ocultar a senha enquanto você digita.
Link to='/Home' = encaminha você para determinado local (no caso, o nosso vai p/ home)
submit = envio de informação, basicamente é equivalente ao Enter.
*/