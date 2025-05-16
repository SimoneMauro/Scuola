let products = [];
let cart = [];

// Carica i prodotti dal file JSON
fetch('prodotti.json')
  .then(response => response.json())
  .then(data => {
    products = data.filter(p => p.categoria === "Automobile");
    renderProducts(products);
  })
  .catch(err => console.error("Errore nel caricamento:", err));

// Mostra le auto nel contenitore principale
function renderProducts(list) {
  const container = document.getElementById('container');
  container.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `
      <img src="${p.immagine}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p><strong>Marca:</strong> ${p.marca}</p>
      <p><strong>Prezzo:</strong> € ${p.prezzo}</p>
      <p>${p.descrizione}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'>Aggiungi al carrello</button>
    `;
    container.appendChild(card);
  });
}

// Aggiunge un'auto al carrello
function addToCart(product) {
  cart.push(product);
  updateCart();
}

// Aggiorna visivamente il carrello
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = "cart-item";
    div.innerHTML = `
      ${item.nome} - € ${item.prezzo}
      <button onclick="removeFromCart(${index})">Rimuovi</button>
    `;
    cartItems.appendChild(div);
    total += item.prezzo;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Rimuove un'auto dal carrello
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Simula l’acquisto
function checkout() {
  if (cart.length === 0) {
    alert("Il carrello è vuoto!");
  } else {
    alert("Acquisto completato! Hai speso € " + cart.reduce((sum, p) => sum + p.prezzo, 0).toFixed(2));
    cart = [];
    updateCart();
  }
}
