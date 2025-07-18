document.addEventListener('DOMContentLoaded', () => {
  const idInput = document.getElementById('id');
  const nomeInput = document.getElementById('nome');
  const sobrenomeInput = document.getElementById('sobrenome');
  const matriculaInput = document.getElementById('matricula');
  const telefoneInput = document.getElementById('telefone');
  const emailInput = document.getElementById('email');
 
  const pesquisar = document.getElementById('pesquisar');
  const atualizar = document.getElementById('atualizar');

  function limparCampos() {
    nomeInput.value = '';
    sobrenomeInput.value = '';
    matriculaInput.value = '';
    telefoneInput.value = '';
    emailInput.value = '';
  }

  pesquisar.addEventListener('click', e => {
    e.preventDefault();
    const id = idInput.value.trim();
    if (!id) return alert('Informe o Código de Identificação.');

    fetch(`http://localhost:8081/professor/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Professor não encontrado');
        return res.json();
      })
      .then(dados => {
        nomeInput.value = dados.nome || '';
        sobrenomeInput.value = dados.sobrenome || '';
        matriculaInput.value = dados.matricula || '';
        telefoneInput.value = dados.telefone || '';
        emailInput.value = dados.email || '';
        alert('Dados carregados.');
      })
      .catch(err => {
        limparCampos();
        alert(err.message);
      });
  });

  atualizar.addEventListener('click', e => {
    e.preventDefault();
    const id = idInput.value.trim();

    const dadosAtualizados = {
      nome: nomeInput.value.trim(),
      sobrenome: sobrenomeInput.value.trim(),
      matricula: matriculaInput.value.trim(),
      telefone: telefoneInput.value.trim(),
      email: emailInput.value.trim()
    };

    fetch(`http://localhost:8081/professor/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosAtualizados)
    })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao atualizar professor.');
      alert('Professor atualizado com sucesso!');
    })
    .catch(err => alert(err.message));
  });
});
