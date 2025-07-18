let listar = document.getElementById('listar');
let resultado = document.getElementById('resultado');

listar.addEventListener('click', (event) => {
  event.preventDefault();

  fetch('http://localhost:8081/professor', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    if (!response.ok) throw 'Erro ao listar professor.';
    return response.json();
  })
  .then(dados => {
    if (dados.length === 0) {
      resultado.innerHTML = '<p>Nenhum professor encontrado.</p>';
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

    dados.forEach(professor => {
      tabela += `
        <tr>
          <td>${professor.nome}</td>
          <td>${professor.sobrenome}</td>
          <td>${professor.matricula}</td>
          <td>${professor.telefone}</td>
          <td>${professor.email}</td>
        </tr>`;
    });

    tabela += '</tbody></table>';
    resultado.innerHTML = tabela;
  })
  .catch(error => {
    resultado.innerHTML = `<p style="color: red;">${error}</p>`;
  });
});
