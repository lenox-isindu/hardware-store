let cartCount = 0;

function addToCart() {
    cartCount++;
    document.querySelector('.cart-badge').textContent = cartCount;
}

function openCart() {
    alert(`You have ${cartCount} item(s) in your cart.`);
}



