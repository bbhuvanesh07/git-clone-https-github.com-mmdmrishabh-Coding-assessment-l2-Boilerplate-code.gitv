async function fetchCartData() {
    const apiURL = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cart data:", error);
        return null;
    }
}

async function renderCartItems() {
    const data = await fetchCartData();
    if (!data) return;

    const cartItemsContainer = document.getElementById("cart-list");
    let subtotal = 0;

    data.items.forEach(item => {
        const itemSubtotal = (item.price / 100) * item.quantity;
        subtotal += itemSubtotal;

        const itemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p>Price: ₹${(item.price / 100).toFixed(2)}</p>
                    <input type="number" class="quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                </div>
                <p>Subtotal: ₹${itemSubtotal.toFixed(2)}</p>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
    });

    document.getElementById("subtotal").textContent = `₹${(subtotal / 100).toFixed(2)}`;
    document.getElementById("total").textContent = `₹${(subtotal / 100).toFixed(2)}`;
}

renderCartItems();

// Event Listener for Quantity Update
document.getElementById("cart-list").addEventListener("input", (event) => {
    if (event.target.classList.contains("quantity")) {
        const newQuantity = event.target.value;
        const itemId = event.target.dataset.id;
        console.log(`Update item ${itemId} to quantity ${newQuantity}`);
    }
});
