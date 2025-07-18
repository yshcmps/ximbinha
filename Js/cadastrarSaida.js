document.addEventListener('DOMContentLoaded', () => {
  const cadastrar = document.getElementById('cadastrar');
  const formulario = document.getElementById('formulario');
  const res = document.getElementById('res');

  cadastrar.addEventListener('click', (event) => {
    event.preventDefault();

    let ultimoCodigo = parseInt(localStorage.getItem('ultimoCodSaida')) || 0;
    let novoCodSaida = ultimoCodigo + 1;

    localStorage.setItem('ultimoCodSaida', novoCodSaida);

    const dados = {
      codSaida: novoCodSaida, 
      dataSolicitacao: document.getElementById('dataSolicitacao').value,
      horaSaida: document.getElementById('horaSaida').value,
      horaRetorno: document.getElementById('horaRetorno').value,
      motivo: document.getElementById('motivo').value.trim(),
      status: "Pendente",
      localDestino: document.getElementById('localDestino').value.trim(),
      nomeAluno: document.getElementById('nomeAluno').value.trim(),
      nomeProfessor: document.getElementById('nomeProfessor').value.trim(),
      aluno_cod: parseInt(document.getElementById('aluno_id').value),
      professor_cod: parseInt(document.getElementById('professor_id').value)
    };

    console.log('Dados enviados:', dados);

    fetch('http://localhost:8081/saida', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao cadastrar saída.');
      return response.json();
    })
    .then(() => {
      res.innerHTML = `<p style="color: green;">Saída cadastrada com sucesso!<br>`;
      formulario.reset();
    })
    .catch(error => {
      console.error(error);
      res.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
  });
});
