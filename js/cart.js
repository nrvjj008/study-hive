const loggedInUserFromLocal = JSON.parse(localStorage.getItem('loggedInUser'));

// If user is logged in, show the loggedInSection and hide the notLoggedInSection
if (loggedInUserFromLocal) {
    document.getElementById('loggedInSection').classList.remove('hidden');
    document.getElementById('notLoggedInSection').classList.add('hidden');
    const cartItems = JSON.parse(localStorage.getItem('carts')) || {};
    const userCart = cartItems[loggedInUserFromLocal.email] || [];
    if (userCart.length == 0){
        document.getElementById('loggedInSection').innerHTML = "<div class=\"container d-flex justify-content-center h-50 py-5\">\n" +
            "            <h1 class=\"py-5\">No Item Added</h1>\n" +
            "        </div>"
    }

} else {
    // If user is not logged in, show the notLoggedInSection and hide the loggedInSection
    document.getElementById('loggedInSection').classList.add('hidden');
    document.getElementById('notLoggedInSection').classList.remove('hidden');

}

// Load JSON data from courses.json file

displayCartItems();


function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('carts')) || {};
    const userCart = cartItems[loggedInUserFromLocal.email] || [];
    if (userCart.length == 0)
        return;
    console.log(userCart);

    fetch("courses.json")
        .then((response) => response.json())
        .then((data) => {
            let totalPrice = 0;
            let itemsHtml = '';
            userCart.forEach(itemId => {
                const item = data.find(course => course.id == itemId);
                if (item) {
                    totalPrice += parseFloat(item.price);
                    itemsHtml += `
                        <li class="list-group-item d-flex justify-content-between align-items-center bg-dark text-white">
                            <div>
                                 <svg onclick="removeItem('${itemId}')" color="red" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                                </svg>
                                <span>${item.name}</span>
                            </div>
                            <span>$${item.price}</span>
                        </li>
                    `;
                }
            });

            const subTotal = totalPrice.toFixed(2);
            const tax = (totalPrice * 0.1).toFixed(2);
            const total = (totalPrice + parseFloat(tax)).toFixed(2);

            const summaryHtml = `
                <li class="list-group-item d-flex justify-content-between align-items-center bg-gradient text-black">
                    <div>
                        <p class="mb-0">Sub Total</p>
                        <p class="mb-0">Tax</p><hr>
                        <p class="mb-0">Total</p>
                    </div>
                    <div>
                        <p class="mb-0">$${subTotal}</p>
                        <p class="mb-0">+$${tax}</p><hr>
                        <p class="mb-0">$${total}</p>
                    </div>
                </li>
            `;

            const cartList = document.getElementById('summaryTable');
            cartList.innerHTML = itemsHtml + summaryHtml;
        })
        .catch((error) => console.error(error));
}

function removeItem(itemId) {
    const cartItems = JSON.parse(localStorage.getItem('carts')) || {};
    const userCart = cartItems[loggedInUserFromLocal.email] || [];

    // Find the index of the item in the user's cart
    const itemIndex = userCart.indexOf(itemId);

    if (itemIndex >= 0) {
        // Remove the item from the cart
        userCart.splice(itemIndex, 1);

        // Update the cart in localStorage
        cartItems[loggedInUserFromLocal.email] = userCart;
        localStorage.setItem('carts', JSON.stringify(cartItems));

        // Refresh the page
        location.reload();
    }
}