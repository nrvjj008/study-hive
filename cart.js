const loggedInUserFromLocal = JSON.parse(localStorage.getItem('loggedInUser'));

// If user is logged in, show the loggedInSection and hide the notLoggedInSection
if (loggedInUserFromLocal) {
    document.getElementById('loggedInSection').classList.remove('hidden');
    document.getElementById('notLoggedInSection').classList.add('hidden');
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
    if(userCart.length === 0) {
        console.log('Cart is empty.');
        return;
    }
    console.log(userCart)


    fetch("courses.json")
        .then((response) => response.json())
        .then((data) => {
            const cartList = document.querySelector('#cart-list');
            let total = 0;

            userCart.forEach((courseId) => {
                const course = data.find((c) => c.id == courseId);
                if (course) {
                    const item = document.createElement('li');
                    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                    item.innerHTML = `
                        <span>${course.name}</span>
                        <span>$${course.price}</span>
                    `;
                    cartList.appendChild(item);
                    total += parseInt(course.price);
                }
            });

            const totalEl = document.querySelector('#cart-total');
            totalEl.innerHTML = `$${total.toFixed(2)}`;
        })
        .catch((error) => console.error(error));
}

