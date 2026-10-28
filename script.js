
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxYoRQz2K2WGs5xGfT0bO0X5z_LmKaoZBAdcpcsFfHMJnwZKihal5N0E_8Rx96Y--a8/exec';
const form = document.getElementById('formularioAlunos');
const formArea = document.getElementById('formArea');
const comprovanteBox = document.getElementById('comprovanteBox');
const btn = document.getElementById('btnEnviar');
const statusMsg = document.getElementById('status');

const selectEscola = document.getElementById('escola');
const outraEscolaInput = document.getElementById('outraEscolaInput');
const inputWhatsapp = document.getElementById('whatsapp');

// 1. Oculta/Exibe o campo "Outra Escola" dinamicamente
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

// 2. Máscara em tempo real para o campo de WhatsApp: (00) 00000-0000
inputWhatsapp.addEventListener('input', function(e) {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 11) v = v.substring(0, 11);
  
  if (v.length > 6) {
    e.target.value = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
  } else if (v.length > 2) {
    e.target.value = `(${v.substring(0, 2)}) ${v.substring(2)}`;
  } else if (v.length > 0) {
    e.target.value = `(${v}`;
  } else {
    e.target.value = '';
  }
});

// 3. Processamento do Formulário
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  btn.disabled = true;
  btn.innerText = 'Enviando...';
  statusMsg.innerText = '';

  const data = new FormData(form);

  // Define a escola correta se tiver selecionado "outra"
  let escolaFinal = selectEscola.value;
  if (escolaFinal === 'outra') {
    escolaFinal = outraEscolaInput.value.trim();
    data.set('escola', escolaFinal);
  }

  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: new URLSearchParams(data)
  })
  .then(response => response.json())
  .then(res => {
    if (res.result === 'success') {
      // Preenche os dados no cartão do comprovante
      document.getElementById('compNome').innerText = document.getElementById('nome').value;
      document.getElementById('compEmail').innerText = document.getElementById('email').value;
      document.getElementById('compEscola').innerText = escolaFinal;
      document.getElementById('compCurso').innerText = document.getElementById('curso').value;
      document.getElementById('compPeriodo').innerText = document.getElementById('periodo').value;

      // Esconde o formulário e exibe o comprovante
      formArea.style.display = 'none';
      comprovanteBox.style.display = 'block';
    } else {
      throw new Error(res.message || 'Erro no servidor ao salvar.');
    }
  })
  .catch(error => {
    statusMsg.style.color = '#ff6b6b';
    statusMsg.innerText = error.message || 'Erro ao enviar. Tente novamente.';
    console.error('Erro no envio:', error);
  })
  .finally(() => {
    btn.disabled = false;
    btn.innerText = 'Enviar Cadastro';
  });
});

// 4. Função para reiniciar o formulário após a confirmação
function reiniciarFormulario() {
  form.reset();
  outraEscolaInput.style.display = 'none';
  outraEscolaInput.required = false;
  comprovanteBox.style.display = 'none';
  formArea.style.display = 'block';
  statusMsg.innerText = '';
}