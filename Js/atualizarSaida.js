document.addEventListener('DOMContentLoaded', () => {
    const pesquisar = document.getElementById('pesquisar');
    const atualizar = document.getElementById('atualizar');
    const res = document.getElementById('res');
  
    pesquisar.addEventListener('click', () => {
      const id = document.getElementById('id').value;
  
      if (!id) {
        res.innerHTML = '<p style="color:red;">Insira o código da saída.</p>';
        return;
      }
  
      fetch(`http://localhost:8081/saida/${id}`)
        .then(response => {
          if (!response.ok) throw new Error('Saída não encontrada.');
          return response.json();
        })
        .then(saida => {
          document.getElementById('dataSolicitacao').value = saida.dataSolicitacao;
          document.getElementById('horaSaida').value = saida.horaSaida;
          document.getElementById('horaRetorno').value = saida.horaRetorno;
          document.getElementById('motivo').value = saida.motivo;
          document.getElementById('localDestino').value = saida.localDestino;
          document.getElementById('status').value = saida.status;
          document.getElementById('nomeAluno').value = saida.nomeAluno;
          document.getElementById('nomeProfessor').value = saida.nomeProfessor;
          document.getElementById('aluno_id').value = saida.aluno_cod;
          document.getElementById('professor_id').value = saida.professor_cod;
          res.innerHTML = '';
        })
        .catch(error => {
          console.error(error);
          res.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
    });
  
    atualizar.addEventListener('click', () => {
      const id = document.getElementById('id').value;
  
      const dados = {
        dataSolicitacao: document.getElementById('dataSolicitacao').value,
        horaSaida: document.getElementById('horaSaida').value,
        horaRetorno: document.getElementById('horaRetorno').value,
        motivo: document.getElementById('motivo').value,
        localDestino: document.getElementById('localDestino').value,
        status: document.getElementById('status').value,
        nomeAluno: document.getElementById('nomeAluno').value,
        nomeProfessor: document.getElementById('nomeProfessor').value,
        aluno_cod: document.getElementById('aluno_id').value,
        professor_cod: document.getElementById('professor_id').value
      };
  
      fetch(`http://localhost:8081/saida/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })
        .then(response => {
          if (!response.ok) throw new Error('Erro ao atualizar a saída.');
          return response.json();
        })
        .then(() => {
          res.innerHTML = '<p style="color: green;">Saída atualizada com sucesso!</p>';
        })
        .catch(error => {
          console.error(error);
          res.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
    });
  });
  