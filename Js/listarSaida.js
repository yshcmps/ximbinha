let listar = document.getElementById('listar');
let resultado = document.getElementById('resultado');

listar.addEventListener('click', (event) => {
  event.preventDefault();

  fetch('http://localhost:8081/saida', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    if (!response.ok) throw 'Erro ao listar saídas.';
    return response.json();
  })
  .then(dados => {
    if (dados.length === 0) {
      resultado.innerHTML = '<p>Nenhuma saída encontrada.</p>';
      return;
    }

    let tabela = `
      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>Data de Solicitação</th>
            <th>Hora da Saída</th>
            <th>Hora de Retorno</th>
            <th>Motivo</th>
            <th>Destino</th>
            <th>Status</th>
            <th>Aluno</th>
            <th>Professor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>`;

    dados.forEach(saida => {
      tabela += `
        <tr>
          <td>${saida.dataSolicitacao}</td>
          <td>${saida.horaSaida}</td>
          <td>${saida.horaRetorno}</td>
          <td>${saida.motivo}</td>
          <td>${saida.localDestino}</td>
          <td>${saida.status}</td>
          <td>${saida.nomeAluno}</td>
          <td>${saida.nomeProfessor}</td>
          <td>
            ${saida.status === 'PENDENTE' ? `
              <button onclick="atualizarStatus(${saida.id}, 'PERMITIDO')">Permitir</button>
              <button onclick="atualizarStatus(${saida.id}, 'RECUSADO')">Recusar</button>
            ` : saida.status}
          </td>
        </tr>
      `;
    });

    tabela += '</tbody></table>';
    resultado.innerHTML = tabela;
  })
  .catch(error => {
    resultado.innerHTML = `<p style="color: red;">${error}</p>`;
  });
});

function atualizarStatus(id, novoStatus) {
  fetch(`http://localhost:8081/saida/${id}`, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: novoStatus })
  })
  .then(response => {
    if (!response.ok) throw 'Erro ao atualizar status.';
    return response.json();
  })
  .then(() => {
    alert(`Saída ${novoStatus.toLowerCase()} com sucesso!`);
    listarBtn.click(); 
  })
  .catch(error => {
    alert(`Erro: ${error}`);
  });
}
