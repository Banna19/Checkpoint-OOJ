// Classe Product
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Classe ShoppingCartItem
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Calculer le prix total de l'article
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// Classe ShoppingCart
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Ajouter un article au panier
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.updateDisplay();
    }

    // Supprimer un article du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateDisplay();
    }

    // Obtenir le total des articles dans le panier
    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Afficher les articles du panier
    updateDisplay() {
        const cartItemsList = document.getElementById('cartItems');
        cartItemsList.innerHTML = '';
        this.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.product.name} - ${item.quantity} - ${item.getTotalPrice()}€`;
            cartItemsList.appendChild(li);
        });
        document.getElementById('cartTotal').textContent = this.getTotal().toFixed(2);
    }

    // Vider le panier
    clear() {
        this.items = [];
        this.updateDisplay();
    }
}

// Variables globales
const cart = new ShoppingCart();
const products = [];
let productId = 1;

// Ajouter un produit
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    if (name && !isNaN(price)) {
        const product = new Product(productId++, name, price);
        products.push(product);
        updateProductSelect();
    }
}

// Mettre à jour la liste déroulante des produits
function updateProductSelect() {
    const productSelect = document.getElementById('productSelect');
    productSelect.innerHTML = '';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - ${product.price}€`;
        productSelect.appendChild(option);
    });
}

// Ajouter un produit au panier
function addToCart() {
    const productId = parseInt(document.getElementById('productSelect').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const product = products.find(p => p.id === productId);
    if (product && quantity > 0) {
        cart.addItem(product, quantity);
    }
}

// Vider le panier
function clearCart() {
    cart.clear();
}
