import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAfErcRDoWGwZkhSvxQehJfvh2eXdFtNjY",
    authDomain: "online-hardware-5545a.firebaseapp.com",
    projectId: "online-hardware-5545a",
    storageBucket: "online-hardware-5545a.firebasestorage.app",
    messagingSenderId: "211586361252",
    appId: "1:211586361252:web:ab2506f1a2c6aadfbe0331"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get category from URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
document.getElementById("category-title").innerText = category;

// Fetch products from Firestore
async function fetchProducts() {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "<p>Loading products...</p>";

  const q = query(collection(db, "products"), where("category", "==", category));
  const querySnapshot = await getDocs(q);

  productContainer.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const product = doc.data();
    const productCard = `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>KES ${product.price}</p>
        <button onclick="addToCart('${doc.id}')">Add to Cart</button>
      </div>
    `;
    productContainer.innerHTML += productCard;
  });
}

fetchProducts();
