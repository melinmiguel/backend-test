const express = require('express');
const cors = require('cors');
const dns = require('node:dns');

dns.setDefaultResultOrder('verbatim');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO: URL base dos microsserviços (SEM /api/login no final)
const SERVICO_LOGIN_BASE = process.env.URL_LOGIN || 'http://localhost:3002';

// ==========================================
// ROTAS DE LOGIN E USUÁRIOS (Repassadas ao back-login)
// ==========================================

// 1. Login
app.post('/api/login', async (req, res) => {
    try {
        const resposta = await fetch(`${SERVICO_LOGIN_BASE}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const dados = await resposta.json();
        res.status(resposta.status).json(dados);
    } catch (error) {
        console.error('Erro no serviço de login:', error);
        res.status(502).json({ erro: 'Serviço de Login indisponível' });
    }
});

// 2. Recuperar senha
app.post('/api/login/recuperar-senha', async (req, res) => {
    try {
        const resposta = await fetch(`${SERVICO_LOGIN_BASE}/api/login/recuperar-senha`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const dados = await resposta.json();
        res.status(resposta.status).json(dados);
    } catch (error) {
        console.error('Erro ao recuperar senha:', error);
        res.status(502).json({ erro: 'Serviço de Login indisponível' });
    }
});

// 3. Cadastrar usuário
app.post('/api/usuarios', async (req, res) => {
    try {
        const resposta = await fetch(`${SERVICO_LOGIN_BASE}/api/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const dados = await resposta.json();
        res.status(resposta.status).json(dados);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(502).json({ erro: 'Serviço de Usuários indisponível' });
    }
});

// 4. Deletar usuário
app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resposta = await fetch(`${SERVICO_LOGIN_BASE}/api/usuarios/${id}`, {
            method: 'DELETE'
        });

        const dados = await resposta.json();
        res.status(resposta.status).json(dados);
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(502).json({ erro: 'Serviço de Usuários indisponível' });
    }
});

// Inicialização do Servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Gateway rodando na porta ${PORT}`);
    console.log(`Apontando para o serviço de usuários em: ${SERVICO_LOGIN_BASE}`);
});
