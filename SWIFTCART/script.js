const products = [
  89.00, 12.50, 45.00, 110.00,
  7.99, 150.00, 22.00, 95.00,
  33.00, 64.00, 18.90, 210.00
];

let cart = 0;

function render() {
  const container = document.getElementById('products');
  
  products.forEach((price, i) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <div class="product-bottom">
        <span class="price">$${price.toFixed(2)}</span>
        <button class="add-btn" onclick="add(${i})">Add to Cart</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function add(index) {
  cart++;
  document.getElementById('cartCount').textContent = cart;
  
  // Animation
  const badge = document.getElementById('cartCount');
  badge.style.transform = 'scale(1.2)';
  setTimeout(() => badge.style.transform = 'scale(1)', 150);
}

// Search filter
document.querySelector('.search').addEventListener('input', (e) => {
  const val = e.target.value.toLowerCase();
  const cards = document.querySelectorAll('.product');
  
  cards.forEach((card, i) => {
    const price = products[i].toString();
    card.style.display = price.includes(val) || val === '' ? 'flex' : 'none';
  });
});

document.addEventListener('DOMContentLoaded', render);