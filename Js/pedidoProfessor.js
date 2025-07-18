let filaDiv = document.getElementById('fila');

function atualizarFila() {
  let fila = JSON.parse(localStorage.getItem('fila')) || [];
  filaDiv.innerHTML = '';

  fila.forEach((item, index) => {
    filaDiv.innerHTML += `
      <div>
        <strong>${index + 1}. ${item.nome}</strong> - ${item.motivo} 
        <br>Status: ${item.status}
        <br>
        ${item.status === 'Aguardando aprovação' ? `
          <button onclick="autorizar(${index})">Autorizar</button>
          <button onclick="recusar(${index})">Recusar</button>
        ` : ''}
        <hr>
      </div>
    `;
  });
}

function autorizar(index) {
  let fila = JSON.parse(localStorage.getItem('fila')) || [];
  fila[index].status = 'Autorizado ✅';
  localStorage.setItem('fila', JSON.stringify(fila));
  atualizarFila();
  alert(`Saída de ${fila[index].nome} autorizada.`);
}

function recusar(index) {
  let fila = JSON.parse(localStorage.getItem('fila')) || [];
  fila[index].status = 'Recusado ❌';
  localStorage.setItem('fila', JSON.stringify(fila));
  atualizarFila();
  alert(`Saída de ${fila[index].nome} recusada.`);
}

function limparFinalizados() {
  let fila = JSON.parse(localStorage.getItem('fila')) || [];

  fila = fila.filter(item => item.status === 'Aguardando aprovação');

  localStorage.setItem('fila', JSON.stringify(fila));
  atualizarFila();
  alert(`Pedidos concluídos foram removidos.`);
}

atualizarFila();

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');
}

document.addEventListener('click', function(event) {
  const menu = document.getElementById('menu');
  const menuIcon = document.querySelector('.menu-icon');
  if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
    menu.classList.remove('show');
  }
});