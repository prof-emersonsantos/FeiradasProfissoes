
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxYoRQz2K2WGs5xGfT0bO0X5z_LmKaoZBAdcpcsFfHMJnwZKihal5N0E_8Rx96Y--a8/exec';

const form = document.getElementById('formularioAlunos');
const btn = document.getElementById('btnEnviar');
const statusMsg = document.getElementById('status');

const selectEscola = document.getElementById('escola');
const outraEscolaInput = document.getElementById('outraEscolaInput');

// Oculta/Exibe o campo "Outra Escola" dinamicamente
selectEscola.addEventListener('change', function() {
  if (this.value === 'outra') {
    outraEscolaInput.style.display = 'block';
    outraEscolaInput.required = true;
    outraEscolaInput.focus();
  } else {
    outraEscolaInput.style.display = 'none';
    outraEscolaInput.required = false;
    outraEscolaInput.value = '';
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  btn.disabled = true;
  btn.innerText = 'Enviando...';
  statusMsg.innerText = '';
  statusMsg.style.color = '#333';

  const data = new FormData(form);

  // Se a opção selecionada for "outra", usa o nome digitado no campo de texto
  if (selectEscola.value === 'outra') {
    const nomeDigatado = outraEscolaInput.value.trim();
    data.set('escola', nomeDigatado);
  }

  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: new URLSearchParams(data)
  })
  .then(response => response.json())
  .then(data => {
    statusMsg.style.color = '#28a745';
    statusMsg.innerText = 'Cadastro realizado com sucesso!';
    form.reset();
    outraEscolaInput.style.display = 'none'; // Esconde o campo após enviar
    outraEscolaInput.required = false;
  })
  .catch(error => {
    statusMsg.style.color = '#ff6b6b';
    statusMsg.innerText = 'Erro ao enviar. Tente novamente.';
    console.error('Erro:', error);
  })
  .finally(() => {
    btn.disabled = false;
    btn.innerText = 'Enviar Cadastro';
  });
});