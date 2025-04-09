function cadastrarMedico(event) {
    event.preventDefault();

    // Captura dos valores do formulário
    const medico = {
        nome: document.getElementById('nome').value,
        crm: document.getElementById('crm').value,
        especialidade: document.getElementById('especialidade').value,
        telefone: document.getElementById('telefone').value,
        ativo: document.getElementById('ativo').value === 'true'
    };

    // Validação simples
    if (!medico.nome || !medico.crm || !medico.especialidade || !medico.telefone) {
        document.getElementById('errorMessage').style.display = 'block';
        return;
    }

    // Limpa mensagem de erro se tudo estiver preenchido
    document.getElementById('errorMessage').style.display = 'none';

    // Envio dos dados para o backend
    fetch('http://localhost:8080/medicos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medico)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar médico');
        }
        return response.json();
    })
    .then(() => {
        alert('Médico cadastrado com sucesso!');
        document.getElementById('medicoForm').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar médico:', error);
        alert('Erro ao cadastrar médico.');
    });
}