
let cart = [];


// Add item to cart

function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}


// Update cart

function updateCart() {

    let cartItems = document.getElementById("cart-items");
    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty">Your cart is empty.</p>';

    } else {

        cart.forEach((item, index) => {

            total += item.price * item.quantity;
            count += item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <div>
                        <strong>${item.name}</strong>
                        <p>₹${item.price} × ${item.quantity}</p>
                    </div>

                    <div class="quantity">

                        <button onclick="decreaseQuantity(${index})">
                            -
                        </button>

                        ${item.quantity}

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                        <button
                            class="remove"
                            onclick="removeItem(${index})">
                            ✕
                        </button>

                    </div>

                </div>
            `;
        });
    }

    document.getElementById("total").innerText = total;
    document.getElementById("cart-count").innerText = count;
}


// Increase quantity

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// Decrease quantity

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();
}


// Remove item

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


// Open cart

function openCart() {

    document.getElementById("cart").style.display = "block";
}


// Close cart

function closeCart() {

    document.getElementById("cart").style.display = "none";
}


// Search food

function searchFood() {

    let searchValue =
        document.getElementById("search").value.toLowerCase();

    let foodCards =
        document.querySelectorAll(".food-card");

    foodCards.forEach(card => {

        let foodName =
            card.getAttribute("data-name").toLowerCase();

        if (foodName.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }
    });
}


// Place order

function placeOrder() {

    if (cart.length === 0) {

        alert("Please add some food to your cart!");

    } else {

        alert("🎉 Your order has been placed successfully!");

        cart = [];

        updateCart();

        closeCart();
    }
}

function filterFood(category) {

    let foodCards = document.querySelectorAll(".food-card");

    foodCards.forEach(function(card) {

        let cardCategory = card.getAttribute("data-category");

        if (category === "all" || cardCategory === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}

function viewDetails(foodName) {

    window.location.href =
        "food-details.html?food=" +
        encodeURIComponent(foodName);

}
const foodDetails = {

    "Chicken Burger": {
        price: 149,
        image: "🍔",
        rating: "⭐ 4.7 (95 Reviews)",
        description:
            "Juicy chicken burger with fresh vegetables, cheese and our special sauce."
    },

    "Chicken Biryani": {
        price: 199,
        image: "🍛",
        rating: "⭐ 4.8 (120 Reviews)",
        description:
            "Spicy and delicious chicken biryani prepared with aromatic spices, basmati rice and tender chicken."
    },

    "Cheese Pizza": {
        price: 249,
        image: "🍕",
        rating: "⭐ 4.6 (85 Reviews)",
        description:
            "Hot and cheesy pizza topped with delicious ingredients and special seasoning."
    },

    "French Fries": {
        price: 99,
        image: "🍟",
        rating: "⭐ 4.5 (70 Reviews)",
        description:
            "Crispy golden french fries served with special seasoning and delicious dip."
    },

    "Chicken Noodles": {
        price: 179,
        image: "🍜",
        rating: "⭐ 4.7 (90 Reviews)",
        description:
            "Hot and tasty noodles cooked with chicken, fresh vegetables and flavorful sauces."
    },

    "Cold Coffee": {
        price: 89,
        image: "🥤",
        rating: "⭐ 4.6 (60 Reviews)",
        description:
            "Refreshing chilled cold coffee made with creamy milk and rich coffee."
    }

};

function loadFoodDetails() {

    let params =
        new URLSearchParams(window.location.search);

    let foodName =
        params.get("food");

    if (!foodName) {
        return;
    }

    let food = foodDetails[foodName];

    if (!food) {
        return;
    }

    document.getElementById("food-name").innerText =
        foodName;

    document.getElementById("food-image").innerText =
        food.image;

    document.getElementById("food-price").innerText =
        "₹" + food.price;

    document.getElementById("food-description").innerText =
        food.description;

    document.querySelector(".rating").innerText =
        food.rating;


    document.getElementById("add-button").onclick =
        function() {

            addToCart(foodName, food.price);

        };

}


loadFoodDetails();

function openCheckout() {

    let cartTotal = document.getElementById("total").innerText;

    localStorage.setItem("cartTotal", cartTotal);

    window.location.href = "checkout.html";
}

function placeOrder() {

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    if (name === "" || phone === "" || address === "") {

        alert("Please fill all delivery details.");

        return;
    }

    window.location.href = "order-confirmed.html";
}

function loadCheckoutTotal() {

    let cartTotal = localStorage.getItem("cartTotal");

    if (cartTotal) {

        document.getElementById("subtotal").innerText =
            "₹" + cartTotal;

        let grandTotal = Number(cartTotal) + 40;

        document.getElementById("grand-total").innerText =
            "₹" + grandTotal;
    }
}

loadCheckoutTotal();

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

}

function signupUser() {

    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    if (name === "" || email === "" || password === "") {

        alert("Please fill all details.");

        return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("🎉 Account created successfully!");

    window.location.href = "login.html";
}


function loginUser() {

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let savedEmail = localStorage.getItem("userEmail");
    let savedPassword = localStorage.getItem("userPassword");

    if (email === savedEmail && password === savedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        alert("✅ Login successful!");

        window.location.href = "index.html";

    } else {

        alert("❌ Invalid email or password.");

    }
}

function checkLogin() {

    let isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
    }
}

function logoutUser() {

    localStorage.removeItem("isLoggedIn");

    alert("👋 Logged out successfully!");

    window.location.href = "login.html";
}

function showWelcomeUser() {

    let userName = localStorage.getItem("userName");

    if (userName) {
        document.getElementById("welcome-user").innerText =
            "Welcome, " + userName + " 👋";
    }
}

showWelcomeUser();