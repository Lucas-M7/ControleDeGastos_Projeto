import axios  from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5180/api', // Endereço base da API .NET
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const mensagemErro = error.response?.data?.mensagem || 'Erro inesperado na comunicação com o servidor.';
        console.error('Erro na API:', mensagemErro);
        return Promise.reject(new Error(mensagemErro));
    }
)