document.addEventListener('DOMContentLoaded', () => {
  let saidas = [];
  let idAtual = null;
  let indexAtual = 0;

  const resultado = document.getElementById('resultado');
  const btnPermitir = document.getElementById('permitir');
  const btnRecusar = document.getElementById('recusar');

  fetch('http://localhost:8081/saida')
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        resultado.innerHTML = '<p>Nenhum pedido de saída pendente.</p>';
        return;
      }

      saidas = data;
      exibirSaida(indexAtual);

      btnPermitir.style.display = 'inline-block';
      btnRecusar.style.display = 'inline-block';
    })
    .catch(() => {
      resultado.innerHTML = '<p>Erro ao carregar a fila.</p>';
    });

  function exibirSaida(index) {
    const saida = saidas[index];
    idAtual = saida.id;

    resultado.innerHTML = `
      <div class="card-saida">
        <p><strong>Nome do Aluno:</strong> ${saida.nomeAluno}</p>
        <p><strong>Professor:</strong> ${saida.nomeProfessor}</p>
        <p><strong>Data:</strong> ${saida.dataSolicitacao}</p>
        <p><strong>Hora de Saída:</strong> ${saida.horaSaida}</p>
        <p><strong>Hora de Retorno:</strong> ${saida.horaRetorno}</p>
        <p><strong>Motivo:</strong> ${saida.motivo}</p>
        <p><strong>Destino:</strong> ${saida.localDestino}</p>
      </div>
    `;
  }

  window.atualizarStatus = (novoStatus) => {
    if (idAtual == null) return;

    fetch(`http://localhost:8081/saida/${idAtual}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: novoStatus })
    })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao atualizar status.');
      return res.json();
    })
    .then(saidaAtualizada => {
      alert(`${saidaAtualizada.nomeAluno}, pedido ${saidaAtualizada.status.toLowerCase()}.`);

      indexAtual++;
      if (indexAtual < saidas.length) {
        exibirSaida(indexAtual);
      } else {
        resultado.innerHTML = '<p>Todos os pedidos foram processados.</p>';
        btnPermitir.style.display = 'none';
        btnRecusar.style.display = 'none';
      }
    })
    .catch(err => {
      alert(err.message);
    });
  };
});
