function cadastrarPaciente(event) {
    event.preventDefault();

    // Captura dos valores do formulário
    const paciente = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        ativo: document.getElementById('ativo').value === 'true'
    };

    // Validação simples
    if (!paciente.nome || !paciente.cpf || !paciente.telefone || !paciente.email) {
        document.getElementById('errorMessage').style.display = 'block';
        return;
    }

    // Limpa mensagem de erro
    document.getElementById('errorMessage').style.display = 'none';

    // Envio para o backend
    fetch('http://localhost:8080/pacientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paciente)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }
        return response.json();
    })
    .then(() => {
        alert('Paciente cadastrado com sucesso!');
        document.getElementById('pacienteForm').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar paciente:', error);
        alert('Erro ao cadastrar paciente.');
    });
}