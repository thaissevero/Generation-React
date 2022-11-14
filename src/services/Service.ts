import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://blogpessoal-f1ao.onrender.com/'
});

export const cadastroUsuario = async(url: any, dados: any, setDado: any) => {
    const resposta = await api.post(url, dados)
    setDado(resposta.data)
}

export const login = async(url: any, dados: any, setDado: any) => {
    const resposta = await api.post(url, dados)
    setDado(resposta.data.token)
}

export const busca = async (url: any, setDados: any, header: any) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}
export const buscaId = async (url: any, setDado: any, header: any) => {
    const resposta = await api.get(url, header)
    setDado(resposta.data)
}
export const post = async (url: any, dados: any, setDado: any, header: any) => {
    const resposta = await api.post(url, dados, header)
    setDado(resposta.data)
}
export const put = async (url: any, dados: any, setDado: any, header: any) => {
    const resposta = await api.put(url, dados, header)
    setDado(resposta.data)
}
export const deleteId = async (url: any, header: any) => {
    await api.delete(url, header)
}

/** 
url: dados: setDado = Geralmente elas ficam em ordem por conta de estética, o objeto fica mais bonito por último, no caso é o header. (exemplo do professor)
api.get(url, header) = ele vai seguir a busca por essa ordem, url, header.
get = obter o que já tem registrado
header = token [caracteristica: header é um objeto]


*/