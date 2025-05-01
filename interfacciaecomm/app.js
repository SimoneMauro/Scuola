let products = [];

fetch('prodotti.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    populateCategories();
    renderProducts(products);
  })
  .catch(err => console.error("Errore nel caricamento:", err));

function populateCategories() {
  const select = document.getElementById('categorySelect');
  const categories = [...new Set(products.map(p => p.categoria))];
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function filterCategory() {
  const selected = document.getElementById('categorySelect').value;
  if (selected === "all") {
    renderProducts(products);
  } else {
    renderProducts(products.filter(p => p.categoria === selected));
  }
}

function renderProducts(list) {
  const container = document.getElementById('container');
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(auto-fill, minmax(${calculateCardWidth(list)}px, 1fr))`;
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

function calculateCardWidth(list) {
  const category = list.length > 0 ? list[0].categoria : '';
  switch (category) {
    case 'Automobile': return 300;
    case 'Smartphone': return 200;
    case 'Computer': return 250;
    case 'Elettrodomestico': return 220;
    default: return 200;
  }
}
