function cadastrarConsulta(event) {
    event.preventDefault();

    // Captura dos valores do formulário
    const consulta = {
        medicoId: parseInt(document.getElementById('medicoId').value),
        pacienteId: parseInt(document.getElementById('pacienteId').value),
        dataHora: document.getElementById('dataHora').value
    };

    // Validação simples
    if (!consulta.medicoId || !consulta.pacienteId || !consulta.dataHora) {
        document.getElementById('errorMessage').style.display = 'block';
        return;
    }

    // Limpa mensagem de erro
    document.getElementById('errorMessage').style.display = 'none';

    // Envio para o backend
    fetch('http://localhost:8080/consultas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(consulta)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }
        return response.json();
    })
    .then(data => {
        alert('Consulta cadastrada com sucesso!');
        document.getElementById('consultaForm').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar consulta:', error);
        alert('Erro ao cadastrar consulta.');
    });
}