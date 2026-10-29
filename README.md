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

## 🚀 Como Configurar e Implantar

### 1. Configuração do Google Apps Script
1. Abra a planilha do Google Sheets relacionada ao evento.
2. Acesse **Extensões** > **Apps Script**.
3. Substitua o conteúdo do arquivo `Code.gs` pelo código-fonte do back-end.
4. Execute manualmente a função de autorização para liberar os escopos de e-mail (`MailApp.send_mail`).
5. Clique em **Implantar** > **Gerenciar implantações** > **Nova implantação**.
6. Defina:
   * **Tipo:** Web App
   * **Executar como:** *Eu (sua conta da Unigran)*
   * **Quem pode acessar:** *Qualquer pessoa*
7. Copie a **URL do Web App** gerada.

### 2. Configuração do Front-end
1. No arquivo `script.js`, atualize a constante `APPS_SCRIPT_URL` com o link do seu Web App:
   ```javascript
   const APPS_SCRIPT_URL = 'SUA_URL_DO_APPS_SCRIPT_AQUI';
   ```
2. Faça o commit dos arquivos (`index.html`, `busca.html`, `style.css`, `script.js`, `logo.png`) no seu repositório do GitHub.
3. Ative o **GitHub Pages** nas configurações do repositório (**Settings > Pages**) apontando para a branch principal (`main` ou `master`).

---

## 📧 Limites e Especificações de Envio de E-mail

*   **Cota de Envio:** Como o projeto roda em uma conta institucional **Google Workspace (`@unigran.br`)**, o limite diário é de **1.500 e-mails por dia**.
*   **Comprovante no Front-end:** Caso a cota de e-mails seja atingida ou o usuário informe um e-mail com instabilidade, o **Modal na tela** garante que o aluno visualize seu comprovante imediatamente após o envio para salvar/tirar print.

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

## ⚡ Recomendações para o Dia do Evento

1. **Rede de Internet:** Mantenha os computadores da recepção conectados a uma rede Wi-Fi privativa.
2. **Consultas Rápidas:** Instrua a recepção a buscar os alunos digitando apenas o **primeiro nome + sobrenome** ou o número de **WhatsApp**.
3. **Backup Off-line:** Na manhã do evento, faça o download da planilha em formato `.xlsx` como plano de contingência.

---

*Desenvolvido para a Feira das Profissões 2026 — Unigran Capital.*