let products = [];

fetch('prodotti.json')
  .then(response => response.json())
  .then(data => {
    // Mantieni solo le automobili
    products = data.filter(p => p.categoria === "Automobile");
    renderProducts(products);
  })
  .catch(err => console.error("Errore nel caricamento:", err));

function renderProducts(list) {
  const container = document.getElementById('container');
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(auto-fill, minmax(300px, 1fr))`;
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `
      <img src="${p.immagine}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p><strong>Marca:</strong> ${p.marca}</p>
      <p><strong>Prezzo:</strong> € ${p.prezzo}</p>
      <p>${p.descrizione}</p>
    `;
    container.appendChild(card);
  });
}
