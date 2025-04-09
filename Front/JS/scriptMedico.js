document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('medicoForm');
});

function cadastrarMedico() {
  

    // Desabilitar o botão de envio para evitar múltiplos envios
    const submitButton = document.getElementById('cadastrarButton');
    submitButton.disabled = true;

    // Captura dos valores do formulário
    const medico = {
        nome: document.getElementById('nome').value,
        crm: document.getElementById('crm').value,
        especialidade: document.getElementById('especialidade').value,
        telefone: document.getElementById('telefone').value,
        ativo: document.getElementById('ativo').value === 'true' // Verifica se a opção "Ativo" foi selecionada
    };

    // Validação simples
    if (!medico.nome || !medico.crm || !medico.especialidade || !medico.telefone) {
        document.getElementById('errorMessage').style.display = 'block';
        submitButton.disabled = false; // Reabilitar o botão caso a validação falhe
        return;
    }

    // Limpa a mensagem de erro se tudo estiver preenchido corretamente
    document.getElementById('errorMessage').style.display = 'none';

    // Faz o envio dos dados para o backend
    fetch('http://localhost:8080/medicos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medico)
    })
    .then(response => {
        if (response.status === 409) {
            alert('Médico já cadastrado com esse CRM!');
            return; // Não continue com o processo
        }
        
        if (!response.ok) {
            throw new Error('Erro ao cadastrar médico');
        }
        return response.json();
    })
    .then(data => {
        alert('Médico cadastrado com sucesso!');
        document.getElementById('medicoForm').reset(); // Limpar o formulário
    })
    .catch(error => {
        console.error('Erro ao cadastrar médico:', error);
        alert('Erro ao cadastrar médico.');
    })
    .finally(() => {
        submitButton.disabled = false; // Reabilitar o botão depois que o processo terminar
    });
}
