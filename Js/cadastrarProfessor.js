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
  
      fetch('http://localhost:8081/professor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      .then(response => {
        if (!response.ok) throw 'Erro ao cadastrar professor.';
        return response.json();
      })
      .then(() => {
        alert('professor cadastrado com sucesso!');
      })
      .catch(error => {
        alert(error);
      });
    });
  });
  