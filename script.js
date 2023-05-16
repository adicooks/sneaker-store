window.onload = function () {
    let carts = document.querySelectorAll('.atc');

    let products = [
        {
            name: 'Nike Dunk Low Needlework',
            tag: 'needle',
            price: 180,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low Gardenia&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'gardenia',
            price: 260,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low SLAG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'slag',
            price: 240,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low Panda&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'panda',
            price: 175,
            inCart: 0
        },

        {
            name: 'Nike Dunk Low Needlework',
            tag: 'needle',
            price: 180,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low Gardenia&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'gardenia',
            price: 260,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low SLAG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'slag',
            price: 240,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low Panda&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'panda',
            price: 175,
            inCart: 0
        },

        {
            name: 'Nike Dunk Low Needlework',
            tag: 'needle',
            price: 180,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low Gardenia&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'gardenia',
            price: 260,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low SLAG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'slag',
            price: 240,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low Panda&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'panda',
            price: 175,
            inCart: 0
        },

        {
            name: 'Nike Dunk Low Needlework',
            tag: 'needle',
            price: 180,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low Gardenia&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'gardenia',
            price: 260,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low SLAG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'slag',
            price: 240,
            inCart: 0
        },
        {
            name: 'Nike Dunk Low Panda&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
            tag: 'panda',
            price: 175,
            inCart: 0
        }


    ];


    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
        });
    }

    function onLoadCartNumbers() {
        let productNumbers = localStorage.getItem('cartNumbers');
        if (productNumbers) {
            document.querySelector('.cart span').textContent = productNumbers;
        } else {
            localStorage.setItem('cartNumbers', 0);
            document.querySelector('.cart span').textContent = 0;
        }
    }

    function cartNumbers(product) {
        console.log("product is clicked", product)
        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);
        if (productNumbers) {
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.cart span').textContent = productNumbers + 1;
        } else {
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('.cart span').textContent = 1;
        }

        setItems(product);
    }

    function setItems(product) {
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);

        if (cartItems != null) {
            if (cartItems[product.tag] != undefined) { // Fixed typo: 'underfined' to 'undefined'
                cartItems[product.tag].inCart += 1;
            } else {
                cartItems = {
                    ...cartItems,
                    [product.tag]: product
                }
                cartItems[product.tag].inCart = 1;
            }
        } else {
            product.inCart = 1;
            cartItems = {
                [product.tag]: product
            }
        }

        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        totalCost(product);
    }

    function totalCost(product) {
        let cartCost = localStorage.getItem('totalCost');
        cartCost = parseFloat(cartCost) || 0; // Set to 0 if cartCost is null or NaN
        console.log("cart cost is", cartCost + product.price);

        if (!isNaN(cartCost)) {
            localStorage.setItem("totalCost", (cartCost + product.price).toFixed(2)); // Round to 2 decimal places
        } else {
            localStorage.setItem("totalCost", product.price.toFixed(2)); // Round to 2 decimal places
        }
    }


    function displayCart() {
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);
        let productContainer = document.querySelector(".products");
        let cartCost = localStorage.getItem('totalCost');

        if (cartItems && productContainer) {
            productContainer.innerHTML = '';

            if (Object.keys(cartItems).length === 0) {
                productContainer.innerHTML = '<p>Your cart is empty. Go and buy something!</p>';
            } else {
                Object.values(cartItems).map((item, index) => {
                    productContainer.innerHTML += `
                        <div class="product">
                            <ion-icon name="close-circle" class="remove-item" style="font-size: 24px;"></ion-icon>
                            <img src="${item.tag}.png">
                            <span>${item.name}</span>
                            <div class="price">$${item.price}</div>
                            <div class="quantity">
                                <ion-icon name="caret-back-circle-outline" class="decrease-quantity" style="font-size: 24px;"></ion-icon>
                                <span> ${item.inCart} </span>
                                <ion-icon name="caret-forward-circle-outline" class="increase-quantity" style="font-size: 24px;"></ion-icon>
                            </div>
                            <div class="total">
                                $${(item.inCart * item.price * 1.065).toFixed(2)}
                            </div>
                        </div>
                    `;
                });

                productContainer.innerHTML += `
                    <div class="basketTotalContainer">
                        <h4 class="basketTotalTitle">
                            Basket Total <br> <i> (6.5% Tax)</i>
                        </h4>
                        <h4 class="basketTotal">
                            $${((cartCost - 30)*1.065).toFixed(2)}
                        </h4>
                    </div>
                `;

                let removeButtons = document.querySelectorAll(".product ion-icon.remove-item");
                removeButtons.forEach((button, index) => {
                    button.addEventListener("click", () => {
                        removeItem(index);
                    });
                });

                let decreaseButtons = document.querySelectorAll(".product ion-icon.decrease-quantity");
                decreaseButtons.forEach((button, index) => {
                    button.addEventListener("click", () => {
                        decreaseQuantity(index);
                    });
                });

                let increaseButtons = document.querySelectorAll(".product ion-icon.increase-quantity");
                increaseButtons.forEach((button, index) => {
                    button.addEventListener("click", () => {
                        increaseQuantity(index);
                    });
                });
            }
        }
    }


    function decreaseQuantity(index) {
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);

        let productTag = Object.keys(cartItems)[index];

        if (cartItems[productTag].inCart > 1) {
            cartItems[productTag].inCart -= 1;

            // Update cart numbers
            let productNumbers = localStorage.getItem('cartNumbers');
            productNumbers = parseInt(productNumbers);
            if (productNumbers) {
                localStorage.setItem('cartNumbers', productNumbers - 1);
                document.querySelector('.cart span').textContent = productNumbers - 1;
            }

            // Update total cost
            let cartCost = localStorage.getItem('totalCost');
            cartCost = parseFloat(cartCost); // Parse as float
            if (!isNaN(cartCost)) {
                localStorage.setItem('totalCost', (cartCost - cartItems[productTag].price).toFixed(2)); // Round to 2 decimal places
            }

            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            displayCart();
        }
    }

    function increaseQuantity(index) {
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);

        let productTag = Object.keys(cartItems)[index];

        cartItems[productTag].inCart += 1;

        // Update cart numbers
        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);
        if (productNumbers) {
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.cart span').textContent = productNumbers + 1;
        }

        // Update total cost
        let cartCost = localStorage.getItem('totalCost');
        cartCost = parseFloat(cartCost); // Parse as float
        if (!isNaN(cartCost)) {
            localStorage.setItem('totalCost', (cartCost + cartItems[productTag].price).toFixed(2)); // Round to 2 decimal places
        }

        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        displayCart();
    }


    function removeItem(index) {
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);

        let productTag = Object.keys(cartItems)[index];
        let productQuantity = cartItems[productTag].inCart;
        let productPrice = cartItems[productTag].price;

        // Update cart numbers
        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);
        if (productNumbers) {
            localStorage.setItem('cartNumbers', productNumbers - productQuantity);
            document.querySelector('.cart span').textContent = productNumbers - productQuantity;
        }

        // Update total cost
        let cartCost = localStorage.getItem('totalCost');
        cartCost = parseInt(cartCost);
        if (cartCost) {
            localStorage.setItem('totalCost', cartCost - (productQuantity * productPrice));
        }

        delete cartItems[productTag];

        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        displayCart();
    }

    onLoadCartNumbers();
    displayCart();
}