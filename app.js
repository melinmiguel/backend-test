const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO: Lê a URL do Railway em produção ou usa localhost no desenvolvimento
const SERVICO_CADASTRO = process.env.URL_CADASTRO || 'http://localhost:3001/api/cadastro';
const SERVICO_LOGIN = process.env.URL_LOGIN || 'http://localhost:3002/api/login';

// ==========================================
// ROTAS DO GRUPO DE CADASTRO
// ==========================================

app.post('/api/cadastro', async (req, res) => {
    try {
        const resposta = await fetch(SERVICO_CADASTRO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const dados = await resposta.json();
        res.status(resposta.status).json(dados);
    } catch (error) {
        console.error('Erro no serviço de cadastro:', error);
        res.status(502).json({ erro: 'Serviço de Cadastro indisponível' });
    }
});

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
        console.error('Erro ao verificar documento:', error);
        res.status(502).json({ erro: 'Serviço de Cadastro indisponível' });
    }
});

// ==========================================
// ROTAS DO GRUPO DE LOGIN
// ==========================================

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
        console.error('Erro no serviço de login:', error);
        res.status(502).json({ erro: 'Serviço de Login indisponível' });
    }
});

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
        console.error('Erro ao recuperar senha:', error);
        res.status(502).json({ erro: 'Serviço de Login indisponível' });
    }
});

// Inicialização do Servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Gateway rodando na porta ${PORT}`);
});
