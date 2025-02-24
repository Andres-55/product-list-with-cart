async function loadProducts() {
  try {
      const response = await fetch('data.json');
      const products = await response.json(); 
  
      const container = document.getElementById('grid-container'); 
  
      products.forEach((product, index) => {
          const productDiv = document.createElement('div');
          productDiv.classList.add('product');
          productDiv.id = `item-${index + 1}`; 
  
          productDiv.innerHTML = `
              <div id="top-portion-${index}" class="top-portion">
                  <button id="button-item-${index}" class="button-add-cart" onClick="updateButton('button-item-${index}')">
                      <div id="before-state-${index}" class="before">
                        <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart img"> 
                        <p>Add to Cart</p>
                      </div>
                  </button>
                  <img id="product-img-${index}" class="pics" src="${product.image.desktop}" alt="${product.name}">
              </div>
              <p class="cat">${product.category}</p>
              <h3 id="name-${index}" class="name">${product.name}</h3>
              <p id="price-${index}" class="price">$${product.price.toFixed(2)}</p>
          `;
  
          container.appendChild(productDiv); 
      });
  } catch (error) {
      console.error('Error loading products:', error);
  }
}

window.onload = loadProducts;

let cartItems = 0;
let totalCost = 0;

const cart = {
  "Product-0": 0,
  "Product-1": 0,
  "Product-2": 0,
  "Product-3": 0,
  "Product-4": 0,
  "Product-5": 0,
  "Product-6": 0,
  "Product-7": 0,
  "Product-8": 0,
  "Product-9": 0,
};

function updateButton(productId) {
  const button = document.getElementById(productId);
  const cartTracker = document.getElementById('cart-amount');
  const product_list = document.getElementById("list");


  cart["Product-" + productId[productId.length-1]] += 1;
  cartItems += 1;

  cartTracker.textContent = 'Your Cart (' + cartItems + ')';
  button.textContent = cart['Product-' + productId[productId.length-1]];

  button.innerHTML = `
    <div class="after">
      <button id="minus-button-${productId[productId.length-1]}" class="minus-button" onClick="removeItem('minus-button-${productId[productId.length-1]}')">
        <img class="all-minus" src="./assets/images/icon-decrement-quantity.svg" alt="add icon">
      </button>

      <p id="count-${productId[productId.length-1]}" class="count">${cart['Product-' + productId[productId.length-1]]}</p>

      <button id="add-button-${productId[productId.length-1]}" class="add-button" onClick="addItem('Product-${productId[productId.length-1]}')">
        <img class="all-add" src="./assets/images/icon-increment-quantity.svg" alt="add icon">
      </button>
    </div>
    `;
    
  button.style.backgroundColor = "hsl(14, 86%, 42%)";
  button.disabled = true;
  button.style.cursor = "default";
  const img = document.getElementById('product-img-' + productId[productId.length-1]);
  img.style.border = "2px solid hsl(14, 86%, 42%)";

  const p_tag = document.getElementById(`name-${productId[productId.length-1]}`).innerHTML;
  const price = document.getElementById(`price-${productId[productId.length - 1]}`).innerHTML;
  const total_price = ((cart['Product-' + productId[productId.length-1]]) * (parseFloat(price.replace(/[^0-9.]/g, '')))).toFixed(2);

  const getter = document.getElementById(`total-cart-cost`);
  totalCost += parseFloat(price.replace(/[^0-9.]/g, ''));
  getter.textContent = '$' + totalCost.toFixed(2);

  if(cart['Product-' + productId[productId.length-1]] <= 2)
    {
      product_list.innerHTML += `
        <div id="cart-info-${productId[productId.length-1]}" class="cart-info">
          <div class="cart-left">
            <p class="cart-name-info">${p_tag}</p>
            <div class="info-section">
              <p id="cart-count-${productId[productId.length-1]}" class="cart-count-info"> ${cart['Product-' + productId[productId.length-1]]}x</p>
              <p class="cart-single-price-info">@ ${price}</p>
              <p id="total-price-${productId[productId.length-1]}" class="cart-total-price-info"> $${total_price}</p>
            </div>
          </div>
          <button id="remove-all-${productId[productId.length-1]}" class="cart-right" onClick="removeAll('${productId}')">
            <img src="./assets/images/icon-remove-item.svg" alt="remove icon">
          </button>
           
        </div>
      `;
    }
}

function removeItem(productId) {
  const button = document.getElementById('count-' + productId[productId.length-1]);
  const button_2 = document.getElementById(`button-item-` + productId[productId.length-1]);
  const cartTracker = document.getElementById('cart-amount');
  const amount = document.getElementById('cart-count-' + productId[productId.length-1]);
  const total_cost = document.getElementById(`total-price-${productId[productId.length-1]}`);

  cart["Product-" + productId[productId.length-1]] -= 1;
  cartItems -= 1;

  if(cart["Product-" + productId[productId.length-1]] <= 0)
  {
    const elem = document.getElementById(`cart-info-${productId[productId.length-1]}`);
    elem.remove();
    button_2.style.backgroundColor = "white";
    button_2.disabled = false;
    button_2.style.cursor = "pointer";
    const img = document.getElementById('product-img-' + productId[productId.length-1]);
    img.style.border = "none";

    
    button_2.innerHTML = `
      <div id="before-state-${productId[productId.length-1]}" class="before">
        <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart img"> 
        <p>Add to Cart</p>
      </div>
    `;
    totalCost.textContent = '$' + totalCost.toFixed(2);
  }

  
  const price = document.getElementById(`price-${productId[productId.length - 1]}`).innerHTML;
  const total_price = ((cart['Product-' + productId[productId.length-1]]) * (parseFloat(price.replace(/[^0-9.]/g, '')))).toFixed(2);

  total_cost.textContent = '$' + total_price;

  const getter = document.getElementById(`total-cart-cost`);
  totalCost -= parseFloat(price.replace(/[^0-9.]/g, ''));
  getter.textContent = '$' + totalCost.toFixed(2);

  cartTracker.textContent = 'Your Cart (' + cartItems + ')';
  button.textContent = cart['Product-' + productId[productId.length-1]];
  amount.textContent = cart['Product-' + productId[productId.length-1]] + ' x';
}

function addItem(productId) {
  const button = document.getElementById('count-' + productId[productId.length-1]);
  const cartTracker = document.getElementById('cart-amount');
  const amount = document.getElementById('cart-count-' + productId[productId.length-1]);
  const total_cost = document.getElementById(`total-price-${productId[productId.length-1]}`);
  
  cart["Product-" + productId[productId.length-1]] += 1;
  cartItems += 1;

  cartTracker.textContent = 'Your Cart (' + cartItems + ')';
  button.textContent = cart['Product-' + productId[productId.length-1]];
  amount.textContent = cart['Product-' + productId[productId.length-1]] + ' x';

  const price = document.getElementById(`price-${productId[productId.length - 1]}`).innerHTML;
  const total_price = ((cart['Product-' + productId[productId.length-1]]) * (parseFloat(price.replace(/[^0-9.]/g, '')))).toFixed(2);

  total_cost.textContent = '$' + total_price;

  const getter = document.getElementById(`total-cart-cost`);
  totalCost += parseFloat(price.replace(/[^0-9.]/g, ''));
  getter.textContent = '$' + totalCost.toFixed(2);

  
}

function removeAll(productId) {
  const button_2 = document.getElementById(`button-item-` + productId[productId.length-1]);
  const sub = document.getElementById(`total-price-${productId[productId.length-1]}`);
  const elem = document.getElementById(`cart-info-${productId[productId.length-1]}`);
    elem.remove();
    button_2.style.backgroundColor = "white";
    button_2.disabled = false;
    button_2.style.cursor = "pointer";
    const img = document.getElementById('product-img-' + productId[productId.length-1]);
    img.style.border = "none";

    
    button_2.innerHTML = `
      <div id="before-state-${productId[productId.length-1]}" class="before">
        <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart img"> 
        <p>Add to Cart</p>
      </div>
    `;
    
    totalCost -= parseFloat(sub.textContent.replace(/[^0-9.]/g, ''));
    cart["Product-" + productId[productId.length-1]] = 0;

    const total = document.getElementById(`total-cart-cost`);
    total.textContent = '$' + totalCost.toFixed(2);
}

function purchase() {
  const main = document.getElementById('card');
  const add = document.querySelectorAll('.add-button');
  const minus = document.querySelectorAll('.minus-button');
  
  const a = Array.from(add).map(parent => parent.id);
  const b = Array.from(minus).map(parent => parent.id);
  a.forEach((parent) => {
    const elem = document.getElementById(parent);
    elem.remove();
  });
  b.forEach((parent) => {
    const elem = document.getElementById(parent);
    elem.remove();
  });
  main.innerHTML += `
    <div class="container">
      <div class="confirmation-page">
        <img src="./assets/images/icon-order-confirmed.svg" alt="check icon">
        <h1>Order Confirmed</h1>
        <p>We hope you enjoyed your food!</p>
        <div class="order-details">
        </div>
        <button class="purchase-button" onClick="location.reload()">Start New Order</button>
      </div
    </div>
  `;

  const order_list = document.querySelector('.order-details');
  const thing = document.getElementById("list");
  const parents = thing.querySelectorAll("div[id^='cart-info-']")
  const parentIds = Array.from(parents).map(parent => parent.id);
  console.log(parentIds);

  parentIds.forEach((parent) => {
    console.log(parent);
    const img_copy = document.getElementById(`product-img-${parent[parent.length-1]}`);
    const info_copy = document.getElementById(parent);
    order_list.innerHTML += `
      <div id="details-${parent[parent.length-1]}" class='details'>
        ${img_copy.outerHTML}
        ${info_copy.outerHTML}
      </div>
    `;
    const y = document.getElementById(`details-${parent[parent.length-1]}`);
    const x = y.querySelector(`#total-price-${parent[parent.length-1]}`);
    const z = y.querySelector('button');
    
    x.remove(); 
    z.remove();
    y.innerHTML += `
      <p class="purchase-total">${x.outerHTML}<p>
    `;
    console.log(x.outerHTML);
    
  });
  order_list.innerHTML += `
    <div class="confirm-total">
      <p class="left">Order Total: </p>
      <p class="right"> $${totalCost.toFixed(2)}</p>
    </div>
  `;
  
}