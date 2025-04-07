function cadastrarMedico(event) {
    event.preventDefault();

    // Captura dos valores do formulário
    const medico = {
        nome: document.getElementById('nome').value,
        crm: document.getElementById('crm').value,
        especialidade: document.getElementById('especialidade').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        ativo: document.getElementById('ativo').value === 'true'
    };

    // Validação simples
    if (!medico.nome || !medico.crm || !medico.especialidade || !medico.telefone || !medico.email) {
        document.getElementById('errorMessage').style.display = 'block';
        return;
    }

    // Limpa mensagem de erro se tudo estiver preenchido
    document.getElementById('errorMessage').style.display = 'none';

    // Simulação de envio para o backend (substitua por chamada à API)
    console.log('Dados do médico:', medico);

    // Exemplo de chamada à API (descomente e ajuste conforme seu endpoint)
    /*
    fetch('http://localhost:8080/medico', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medico)
    })
    .then(response => response.json())
    .then(data => {
        alert('Médico cadastrado com sucesso!');
        document.getElementById('medicoForm').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar médico:', error);
        alert('Erro ao cadastrar médico.');
    });
    */

    // Feedback temporário (simulação)
    alert('Médico cadastrado com sucesso! (Simulação)');
    document.getElementById('medicoForm').reset();
}