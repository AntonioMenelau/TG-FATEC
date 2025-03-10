class Cart {
    constructor() {
        this.items = [];
        this.discount = 0;
        this.tax = 0;
        this.paymentMethod = null;
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({...product, quantity});
        }
        this.updateCartDisplay();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.updateCartDisplay();
    }

    applyDiscount(code) {
        // Lógica de desconto
    }

    calculateTotal() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return subtotal - this.discount + this.tax;
    }

    updateCartDisplay() {
        // Atualizar interface do carrinho
    }
}

class Product {
    constructor(id, name, price, category, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
    }
}

// Inicialização
const cart = new Cart();
let selectedProduct = null;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Modal de Quantidade
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            selectedProduct = getProductData(e.target.closest('[data-product-id]'));
            showQtyModal();
        });
    });

    // Controles de Quantidade
    document.querySelectorAll('.increase-qty, .decrease-qty').forEach(button => {
        button.addEventListener('click', (e) => {
            const input = e.target.closest('.cart-item').querySelector('input');
            adjustQuantity(input, e.target.classList.contains('increase-qty') ? 1 : -1);
        });
    });

    // Finalização de Compra
    document.getElementById('checkout-btn').addEventListener('click', showCheckoutModal);
});

function showQtyModal() {
    document.getElementById('qty-modal').classList.remove('hidden');
    document.getElementById('modal-qty').value = 1;
}

function showCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('hidden');
    updateCheckoutValues();
}

function adjustQuantity(input, delta) {
    let value = parseFloat(input.value) || 0;
    value = Math.max(0, value + delta);
    input.value = value.toFixed(2);
    updateCartTotal();
}

function updateCheckoutValues() {
    const total = cart.calculateTotal();
    const receivedInput = document.getElementById('received-amount');
    receivedInput.value = total.toFixed(2);
    calculateChange();
}

function calculateChange() {
    const received = parseFloat(document.getElementById('received-amount').value) || 0;
    const total = cart.calculateTotal();
    const change = received - total;
    document.querySelector('#checkout-modal .change-display').textContent = 
        `R$ ${change >= 0 ? change.toFixed(2) : '0.00'}`;
}

// Fechar Modais
document.querySelectorAll('.close-modal, .close-checkout-modal').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('[id$="-modal"]').forEach(modal => {
            modal.classList.add('hidden');
        });
    });
});

// Atualizar valores em tempo real
document.getElementById('received-amount').addEventListener('input', calculateChange);

// Seleção de Método de Pagamento
document.querySelectorAll('.payment-option').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.payment-option').forEach(btn => {
            btn.classList.remove('ring-2', 'ring-primary-500');
        });
        button.classList.add('ring-2', 'ring-primary-500');
        cart.paymentMethod = button.dataset.method;
    });
});

// Funções Auxiliares
function getProductData(element) {
    return new Product(
        element.dataset.productId,
        element.querySelector('h3').textContent,
        parseFloat(element.querySelector('.price').textContent.replace('R$ ', '')),
        element.querySelector('.category').textContent,
        element.querySelector('img').src
    );
}

function updateCartTotal() {
    const total = cart.calculateTotal();
    document.querySelectorAll('.total-display').forEach(element => {
        element.textContent = `R$ ${total.toFixed(2)}`;
    });
}