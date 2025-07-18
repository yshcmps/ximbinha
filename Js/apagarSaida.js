let formulario = document.getElementById('formulario');
let res = document.getElementById('res');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const id = document.getElementById('codigo').value.trim();

  fetch(`http://localhost:8081/saida/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    if (!response.ok) throw new Error('Erro ao apagar saída.');
    res.innerHTML = `<p style="color: green;">Saída apagada com sucesso!</p>`;
    formulario.reset();
  })
  .catch(error => {
    res.innerHTML = `<p style="color: red;">${error.message || error}</p>`;
  });
});
