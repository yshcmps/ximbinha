document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const res = document.getElementById('res');
  
    formulario.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const id = document.getElementById('codProfessor').value.trim();
  
      if (!id) {
        res.innerHTML = '<p style="color: red;">Informe um código de identificação.</p>';
        return;
      }
  
      fetch(`http://localhost:8081/professor/${id}`)
        .then(response => {
          if (!response.ok) throw new Error('Professor não encontrado.');
          return response.json();
        })
        .then(dados => {
          res.innerHTML = `
            <p><strong>Professor:</strong></p>
            <p>Nome: ${dados.nome}</p>
            <p>Sobrenome: ${dados.sobrenome}</p>
            <p>Matrícula: ${dados.matricula}</p>
            <p>Telefone: ${dados.telefone}</p>
            <p>Email: ${dados.email}</p>
          `;
        })
        .catch(error => {
          res.innerHTML = `<p style="color: black;">${error.message}</p>`;
        });
    });
  });
  