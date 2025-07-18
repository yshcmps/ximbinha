document.addEventListener('DOMContentLoaded', () => {
  let cadastrar = document.getElementById('cadastrar');

  cadastrar.addEventListener('click', (event) => {
    event.preventDefault();

    let dados = {
      nome: document.getElementById('nome').value,
      sobrenome: document.getElementById('sobrenome').value,
      matricula: document.getElementById('matricula').value,
      telefone: document.getElementById('telefone').value,
      email: document.getElementById('email').value
    };

    fetch('http://localhost:8081/aluno', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    .then(response => {
      if (!response.ok) throw 'Erro ao cadastrar aluno.';
      return response.json();
    })
    .then(() => {
      alert('Aluno cadastrado com sucesso!');
    })
    .catch(error => {
      alert(error);
    });
  });
});
