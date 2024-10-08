// Assuming you have an array of products (which you might be getting from your backend or a static array)
const products = [
    { name: 'Raddish 500g', price: 3 },
    { name: 'Tomato 500g', price: 5 },
    { name: 'Chilli 500g', price: 1 },
    { name: 'Potato 500g', price: 4 },
  ];
  
  // Function to filter and display products
  function searchProducts() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase(); // Get the value from the search input
    const productListDiv = document.getElementById('productList'); // The div where products are displayed
    
    // Clear the previous search results
    productListDiv.innerHTML = '';
  
    // Filter products based on the search input
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
  
    // Display the filtered products
    filteredProducts.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <p>${product.name} - $${product.price}</p>
        <button onclick="addToCart('${product.name}', ${product.price})">Add to cart</button>
      `;
  
      productListDiv.appendChild(productElement);
    });
  
    // If no product matches the search, show a "no results" message
    if (filteredProducts.length === 0) {
      productListDiv.innerHTML = '<p>No products found.</p>';
    }
  }
  
let cart = [];

// Function to add a product to the cart
function addToCart(itemName, itemPrice) {
  // Check if the item already exists in the cart
  const existingItem = cart.find(item => item.name === itemName);
  
  if (existingItem) {
    // If the item exists, increase the quantity
    existingItem.quantity += 1;
  } else {
    // If the item does not exist, add it with a quantity of 1
    const item = { name: itemName, price: itemPrice, quantity: 1 };
    cart.push(item);
  }

  // Update the cart display
  updateCart();
  openCart();
}

// Function to increase the quantity of an item
function increaseQuantity(itemName) {
  const item = cart.find(item => item.name === itemName);
  if (item) {
    item.quantity += 1;
    updateCart();
  }
}

// Function to decrease the quantity of an item
function decreaseQuantity(itemName) {
  const item = cart.find(item => item.name === itemName);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    updateCart();
  } else if (item && item.quantity === 1) {
    // If the quantity is 1 and the user tries to decrease, remove the item
    cart = cart.filter(item => item.name !== itemName);
    updateCart();
  }
}

// Function to update the cart contents and the total price
function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems'); // The div to show the cart items
    const cartTotalSpan = document.getElementById('cartTotal'); // The total amount element
  
    // Clear the cart items div before updating
    cartItemsDiv.innerHTML = '';
  
    let total = 0; // To calculate the total amount
  
    // Loop through the cart array to display each item in the cart
    cart.forEach(item => {
      total += item.price * item.quantity;
  
      // Create a new div element for each cart item
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
  
      // Define the HTML structure with the "-" button, item name, quantity, and "+" button
      itemElement.innerHTML = `
        <button class="quantity-btn" onclick="decreaseQuantity('${item.name}')">-</button>
        <p class="cart-item-name">${item.name} ($${item.price})</p>
        <span class="cart-quantity">${item.quantity}</span>
        <button class="quantity-btn" onclick="increaseQuantity('${item.name}')">+</button>
      `;
  
      // Append the cart item to the cartItemsDiv
      cartItemsDiv.appendChild(itemElement);
    });
  
    // Update the total price in the cart
    cartTotalSpan.textContent = total.toFixed(2);
  }
  

// Function to open the cart modal
function openCart() {
  document.getElementById('cartModal').style.display = 'block';
}

// Function to close the cart modal
function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}
