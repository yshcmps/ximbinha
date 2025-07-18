document.addEventListener('DOMContentLoaded', () => {
  const consultar = document.getElementById('consultar');
  const res = document.getElementById('res');

  consultar.addEventListener('click', (event) => {
    event.preventDefault();

    const cod = document.getElementById('idSaida').value

    if (!cod) {
      res.innerHTML = `<p style="color: red;">Por favor, insira o código da saída.</p>`;
      return;
    }

    fetch(`http://localhost:8081/saida/${cod}`)
    .then(response => {
      if (!response.ok) throw new Error("Saída não encontrada.");
      return response.json();  
    })
    .then(saida => {
      res.innerHTML = `
        <p><strong>codSaida:</strong> ${saida.codSaida}</p>
        <p><strong>Data:</strong> ${saida.dataSolicitacao}</p>
        <p><strong>Hora Saída:</strong> ${saida.horaSaida}</p>
        <p><strong>Hora Retorno:</strong> ${saida.horaRetorno}</p>
        <p><strong>Motivo:</strong> ${saida.motivo}</p>
        <p><strong>Destino:</strong> ${saida.localDestino}</p>
        <p><strong>Status:</strong> ${saida.status}</p>
        <p><strong>Aluno:</strong> ${saida.nomeAluno} (ID: ${saida.aluno_cod})</p>
        <p><strong>Professor:</strong> ${saida.nomeProfessor} (ID: ${saida.professor_cod})</p>
      `;
    })
    .catch(error => {
      console.error(error);
      res.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
  });
});
