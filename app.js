const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares para permitir requisições de outras origens e ler o body em JSON
app.use(cors());
app.use(express.json());

// Explicação para a turma: Esse middleware lê o JSON que o cliente envia no POST
app.use(express.json());

// CONFIGURAÇÃO: Onde estão os nossos microsserviços?
const SERVICO_CADASTRO = 'http://localhost:3001/api/cadastro';
const SERVICO_LOGIN = 'http://localhost:3002/api/login';

// ==========================================
// ROTAS DO GRUPO DE CADASTRO (Porta 3001)
// ==========================================

// Rota 1: Criar novo usuário
app.post('/api/cadastro', async (req, res) => {
    try {
        const resposta = await fetch('http://localhost:3001/api/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body) // Repassa os dados recebidos
        });

        const dados = await resposta.json();
        res.status(resposta.status).json(dados);
    } catch (error) {
        res.status(502).json({ erro: 'Serviço de Cadastro indisponível' });
    }

    res.status.apply(500).json({ erro: 'idade não permitida!' })
});

// Rota 2: Verificar se documento já existe (Exemplo de nova rota)
app.post('/api/cadastro/verificar-documento', async (req, res) => {
    try {
        const resposta = await fetch(`${SERVICO_CADASTRO}/verificar-documento`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const dados = await resposta.json();
        res.status(resposta.status).json(dados);
    } catch (error) {
        res.status(502).json({ erro: 'Serviço de Cadastro indisponível' });
    }
});


// ==========================================
// ROTAS DO GRUPO DE LOGIN (Porta 3002)
// ==========================================

// Rota 1: Autenticar usuário
app.post('/api/login', async (req, res) => {
    try {
        const resposta = await fetch(SERVICO_LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const dados = await resposta.json();
        res.status(resposta.status).json(dados);
    } catch (error) {
        res.status(502).json({ erro: 'Serviço de Login indisponível' });
    }
});

// Rota 2: Recuperar senha (Exemplo de nova rota)
app.post('/api/login/recuperar-senha', async (req, res) => {
    try {
        const resposta = await fetch(`${SERVICO_LOGIN}/recuperar-senha`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const dados = await resposta.json();
        res.status(resposta.status).json(dados);
    } catch (error) {
        res.status(502).json({ erro: 'Serviço de Login indisponível' });
    }
});

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`Orquestrador Técnico rodando na porta ${PORT}`);
});
