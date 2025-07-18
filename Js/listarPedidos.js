document.addEventListener('DOMContentLoaded', () => {
    const listaPedidos = document.getElementById('lista-pedidos');
    const fila = JSON.parse(localStorage.getItem('fila')) || [];
  
    if (fila.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 3;
      td.textContent = 'Nenhuma solicitação encontrada.';
      td.style.textAlign = 'center';
      tr.appendChild(td);
      listaPedidos.appendChild(tr);
    } else {
      fila.forEach(pedido => {
        const tr = document.createElement('tr');
  
        const tdNome = document.createElement('td');
        tdNome.textContent = pedido.nome;
  
        const tdMotivo = document.createElement('td');
        tdMotivo.textContent = pedido.motivo;
  
        const tdStatus = document.createElement('td');
        tdStatus.textContent = pedido.status;
  
        tr.appendChild(tdNome);
        tr.appendChild(tdMotivo);
        tr.appendChild(tdStatus);
        listaPedidos.appendChild(tr);
      });
    }
  });
  