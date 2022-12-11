import React, { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import Postagem from "../../../models/Postagem";
import { toast } from "react-toastify";
import { buscaId, deleteId } from "../../../services/Service";

function DeletarPostagem() {

    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    const [post, setPosts] = useState<Postagem>();

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

    useEffect(() => {
        if (id !== undefined) {
            findById(id);
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/postagens/${id}`, setPosts, {
            headers: {
                'Authorization': token
            }
        })
    }

    function sim() {
        navigate("/posts");
        deleteId(`/postagens/${id}`, {
            headers: {
                'Authorization': token
            }
        });

        toast.success("Postagem deletada com sucesso", {
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
        navigate("/posts");
    }

    return (
        <>
            <div className="div-posts">
                <Box m={2}>
                    <Card variant="outlined" className="cardpostagens">
                        <CardContent>
                            <Box justifyContent="center">
                                <Typography>
                                    Deseja realmente deletar a Postagem?
                                </Typography>
                                <Typography color="textSecondary">
                                    {post?.titulo}
                                </Typography>
                            </Box>
                        </CardContent>

                        <CardActions>
                            <Box display="flex" justifyContent="center" ml={1.0} mb={2} >
                                <Box mx={2}>
                                    <Button onClick={sim} variant="contained" size='large' color="primary" className="botao3">
                                        Sim
                                    </Button>
                                </Box>
                                <Box>
                                    <Button onClick={nao} variant="contained" size='large' color="secondary" className="botao3">
                                        Não
                                    </Button>
                                </Box>
                            </Box>
                        </CardActions>
                    </Card>
                </Box>
            </div>
        </>
    );
}
export default DeletarPostagem;