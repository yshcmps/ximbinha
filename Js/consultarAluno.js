let consultar = document.getElementById('consultar');
let res = document.getElementById('res');

consultar.addEventListener('click', (event) => {
  event.preventDefault();

  let id = document.getElementById('codAluno').value;

  fetch(`http://localhost:8081/aluno/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    if (!response.ok) throw 'Aluno não encontrado.';
    return response.json();
  })
  .then(dados => {
    res.innerHTML = `
      <p><strong>Aluno:</strong></p>
      <p>Nome: ${dados.nome}</p>
      <p>Sobrenome: ${dados.sobrenome}</p>
      <p>Matrícula: ${dados.matricula}</p>
      <p>Telefone: ${dados.telefone}</p>
      <p>Email: ${dados.email}</p>
    `;
  })
  .catch(error => {
    res.innerHTML = `<p style="color: black;">${error}</p>`;
  });
});
