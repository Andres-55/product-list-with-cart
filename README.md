# Product list with cart

[Website](https://andres-55.github.io/product-list-with-cart/)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot
![image](https://github.com/user-attachments/assets/f8a18d68-9437-417d-9389-9b97afa81e0b)

### Built with

- CSS custom properties
- CSS Grid
- Mobile-first workflow

### What I learned

I learned how to read all the data in the JSON file and how to display it in the html file
```js
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
```
I also learned how to get a copy of data and display it on the screen in a different way
```js
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
```
