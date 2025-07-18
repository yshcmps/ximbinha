let listar = document.getElementById('listar');
let resultado = document.getElementById('resultado');

listar.addEventListener('click', (event) => {
  event.preventDefault();

  fetch('http://localhost:8081/aluno', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    if (!response.ok) throw 'Erro ao listar alunos.';
    return response.json();
  })
  .then(dados => {
    if (dados.length === 0) {
      resultado.innerHTML = '<p>Nenhum aluno encontrado.</p>';
      return;
    }

    let tabela = `
      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Matrícula</th>
            <th>Telefone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>`;

    dados.forEach(aluno => {
      tabela += `
        <tr>
          <td>${aluno.nome}</td>
          <td>${aluno.sobrenome}</td>
          <td>${aluno.matricula}</td>
          <td>${aluno.telefone}</td>
          <td>${aluno.email}</td>
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
