// Cole aqui a URL gerada ao implantar o Apps Script
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxYoRQz2K2WGs5xGfT0bO0X5z_LmKaoZBAdcpcsFfHMJnwZKihal5N0E_8Rx96Y--a8/exec';

const form = document.getElementById('formularioAlunos');
const btn = document.getElementById('btnEnviar');
const statusMsg = document.getElementById('status');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  btn.disabled = true;
  btn.innerText = 'Enviando...';
  statusMsg.innerText = '';
  statusMsg.style.color = '#333';

  const data = new FormData(form);

  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: new URLSearchParams(data)
  })
  .then(response => {
    statusMsg.style.color = '#28a745';
    statusMsg.innerText = 'Cadastro realizado com sucesso!';
    form.reset();
  })
  .catch(error => {
    statusMsg.style.color = '#dc3545';
    statusMsg.innerText = 'Erro ao enviar. Tente novamente.';
    console.error('Erro:', error);
  })
  .finally(() => {
    btn.disabled = false;
    btn.innerText = 'Enviar Cadastro';
  });
});