#  Feira das Profissões 2026 — Unigran Capital

Sistema completo e otimizado para inscrição, gerenciamento e confirmação de presença de participantes na **Feira das Profissões 2026** da Unigran Capital. 

O projeto conta com um front-end moderno e responsivo hospedado via **GitHub Pages**, integrado diretamente a uma planilha do **Google Sheets** atuando como banco de dados serverless por meio do **Google Apps Script**.

---

##  Identidade Visual Institucional

O sistema segue rigorosamente a paleta de cores e o padrão visual da **Unigran Capital**:

*   **Amarelo Principal:** `#F6CE07` (Destaque, botões e alertas)
*   **Azul Escuro:** `#011638` (Fundos principais, cards e modais)
*   **Off-White / Texto:** `#EFE9F4` (Textos de leitura e contornos suaves)
*   **Branco Puro:** `#FFFFFF` (Campos de entrada focados)

---

## 🛠️ Arquitetura do Sistema

```
[ Usuário / Aluno ] ──( HTTP POST / GET )──> [ GitHub Pages (index.html / busca.html) ]
                                                        │
                                                        ▼
[ Google Sheets ] <──( Web App Engine )─── [ Google Apps Script (Code.gs) ]
       │                                                │
       ▼                                                ▼
[ Registro de Dados ]                          [ MailApp (Envio de E-mail HTML) ]
```

### 1. Front-end (`index.html`, `busca.html`, `style.css`, `script.js`)
*   **Formulário de Inscrição (`index.html`):** Coleta dados de alunos com validações avançadas (máscara dinâmica de WhatsApp, validação de e-mail e campo condicional para escola não listada/sem vínculo escolar).
*   **Modal de Confirmação:** Modal flutuante estilizado exibido imediatamente após o envio bem-sucedido, contendo os dados do comprovante e orientações para o evento.
*   **Painel de Recepção (`busca.html`):** Interface para a equipe de recepção consultar participantes em tempo real e confirmar presença no dia do evento.

### 2. Back-end (`Code.gs` - Google Apps Script)
*   **`doPost(e)`:** Processa novos cadastros e marcações de presença, gravando os dados na planilha e disparando o e-mail de confirmação formatado em HTML.
*   **`doGet(e)`:** Executa consultas de busca para o painel da recepção.

---

## 📋 Estrutura da Planilha (`Google Sheets`)

A planilha associada deve conter as seguintes colunas em ordem:

| Coluna | Campo | Exemplo de Conteúdo |
| :--- | :--- | :--- |
| **A** | Escola | EE Prof Severino de Queiroz / Não estudo |
| **B** | Nome Completo | Maria Silva |
| **C** | Email | maria.silva@exemplo.com |
| **D** | WhatsApp | (67) 99999-8888 |
| **E** | Curso de Interesse | Enfermagem |
| **F** | Período | Matutino |
| **G** | Presença | Pendente / Confirmado |



---

## 📌 Mensagem Oficial de Confirmação

Tanto a tela de confirmação no site quanto o e-mail enviado contêm o texto padronizado:

> **Parabéns! Sua inscrição foi realizada com sucesso!**
> 
> 🎓 Você está confirmado(a) na Feira das Profissões da Unigran Capital!  
> 📅 **Data:** 5 de novembro de 2026.  
> 🎁 **Atenção:** No dia do evento, apresente o comprovante da sua inscrição e garanta seu brinde especial!  
> 💙 Esperamos por você para um dia de descobertas, experiências e oportunidades para o seu futuro!  
> 
> *Unigran Capital – Seu futuro começa aqui!*

---


*Desenvolvido para a Feira das Profissões 2026 — Unigran Capital.*