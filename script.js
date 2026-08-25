// ==========================
// 1. DATA
// ==========================

const cart = {
    "Fresh Mango": 0,
    "Watermelon Honey": 0,
    "Orange": 0
};

const prices = {
    "Fresh Mango": 4.99,
    "Watermelon Honey": 6.99,
    "Orange": 3.99
};

let totalCart = 0;


// ==========================
// 2. ELEMENT HTML
// ==========================

const buttons = document.querySelectorAll(".add-button");

const cartCount = document.querySelector(".cart-count");

const cartPanel = document.querySelector("#cartPanel");

const cartItems = document.querySelector("#cartItems");

const cartTotal = document.querySelector("#cartTotal");

const closeCart = document.querySelector("#closeCart");

const cartNav = document.querySelector(".cart-nav");

const categories =
    document.querySelectorAll(".category");

const productCards =
    document.querySelectorAll(".product-card"); 

const checkoutButton =
    document.querySelector("#checkoutButton");

const searchInput =
    document.querySelector(".search-bar input");

const noProduct =
    document.querySelector("#noProduct");


// ==========================
// 3. FUNCTION
// ==========================

function calculateTotal() {

    let totalPrice = 0;

    for (let productName in cart) {

        totalPrice +=
            prices[productName] * cart[productName];
    }

    return totalPrice;
}


function updateCartDisplay() {

    cartItems.innerHTML = "";

    let hasItem = false;

    for (let productName in cart) {

        if (cart[productName] > 0) {

            hasItem = true;

            const item =
                document.createElement("div");

            item.className = "cart-item";

            item.innerHTML = `
                <div class="cart-product-info">

                    <span class="cart-product-name">
                        ${productName}
                    </span>

                    <span class="cart-product-price">
                        $${prices[productName].toFixed(2)}
                    </span>

                </div>

                <div class="cart-controls">

                    <button class="minus-button">
                        −
                    </button>

                    <span>
                        ${cart[productName]}
                    </span>

                    <button class="plus-button">
                        +
                    </button>

                </div>
            `;

            cartItems.appendChild(item);


            // Tombol minus
            const minusButton =
                item.querySelector(".minus-button");


            minusButton.addEventListener(
                "click",
                function () {

                    if (cart[productName] > 0) {

                        cart[productName]--;

                        totalCart--;

                        cartCount.textContent =
                            totalCart;

                        updateCartDisplay();
                    }
                }
            );


            // Tombol plus
            const plusButton =
                item.querySelector(".plus-button");


            plusButton.addEventListener(
                "click",
                function () {

                    cart[productName]++;

                    totalCart++;

                    cartCount.textContent =
                        totalCart;

                    updateCartDisplay();
                }
            );
        }
    }


    // Kalau keranjang kosong
    if (!hasItem) {

        cartItems.innerHTML =
            '<p class="empty-cart">Keranjang masih kosong</p>';
    }


    // Update total harga
    cartTotal.textContent =
        "$" + calculateTotal().toFixed(2);
}

// ==========================
// 3.5 FILTER
// ==========================

let selectedCategory = "All";

function filterProducts() {

    const keyword =
        searchInput.value.toLowerCase();

    let foundProduct = false;

    productCards.forEach(function (product) {

        const productName =
            product.querySelector("h3")
                .textContent
                .toLowerCase();

        const productCategory =
            product.dataset.category;

        const categoryMatch =
            selectedCategory === "All" ||
            productCategory === selectedCategory;

        const searchMatch =
            productName.includes(keyword);

        if (categoryMatch && searchMatch) {

            product.style.display = "block";

            foundProduct = true;

        } else {

            product.style.display = "none";
        }

    });

    if (foundProduct) {

        noProduct.style.display = "none";

    } else {

        noProduct.style.display = "block";
    }
}


// ==========================
// CATEGORY BUTTON
// ==========================

categories.forEach(function (category) {

    category.addEventListener("click", function () {

        selectedCategory =
            category.dataset.category;

        filterProducts();

    });

});


// ==========================
// SEARCH
// ==========================

searchInput.addEventListener("input", function () {

    filterProducts();

});

searchInput.addEventListener("input", function () {

    filterProducts();

});

// ==========================
// 4. PRODUCT BUTTON
// ==========================

buttons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const productCard =
                button.parentElement.parentElement;

            const productName =
                productCard.querySelector("h3").textContent;


            cart[productName]++;

            totalCart++;


            cartCount.textContent =
                totalCart;


            updateCartDisplay();
        }
    );
});


// ==========================
// 5. CART & CHECKOUT
// ==========================

// Buka keranjang
cartNav.addEventListener(
    "click",
    function () {

        cartPanel.style.display = "block";
    }
);


// Tutup keranjang
closeCart.addEventListener(
    "click",
    function () {

        cartPanel.style.display = "none";
    }
);


// Checkout
checkoutButton.addEventListener(
    "click",
    function () {

        if (totalCart === 0) {

            alert("Keranjang masih kosong!");

            return;
        }


        alert(
            "Checkout berhasil!\nTotal: $" +
            calculateTotal().toFixed(2)
        );
    }
);


// ==========================
// INITIAL DISPLAY
// ==========================

updateCartDisplay();