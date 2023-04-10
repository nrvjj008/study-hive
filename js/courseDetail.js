const courseId = new URLSearchParams(window.location.search).get('id');
loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));


getCourseData(courseId);

let jsonData;
isAddedToCart();
function getCourseData(id) {
    fetch("courses.json")
        .then((response) => response.json())
        .then((data) => {
            jsonData = data;
            const course = data.filter((course) => course.id == id);
            console.log(course);
            displayCourse(course[0]);
        })
}

function addToCart() {
    const cartItems = JSON.parse(localStorage.getItem('carts')) || {};
    const userCart = cartItems[loggedInUser.email] || [];
    if(!userCart.includes(courseId))
        userCart.push(courseId);
    cartItems[loggedInUser.email] = userCart;
    localStorage.setItem('carts', JSON.stringify(cartItems));
    console.log(userCart);
    const addToCartButton = document.getElementById('add-to-cart-btn');
    addToCartButton.innerText = "Added";
    addToCartButton.disabled = true;
    addToCartButton.classList.add("bg-dark");
}

function isAddedToCart(){
    const cartItems = JSON.parse(localStorage.getItem('carts')) || {};
    const userCart = cartItems[loggedInUser.email] || [];
    if(userCart.includes(courseId)) {
        const addToCartButton = document.getElementById('add-to-cart-btn');
        addToCartButton.innerText = "Added";
        addToCartButton.disabled = true;
        addToCartButton.classList.add("bg-dark");
    }
}


function displayCourse(courseData) {
    document.getElementById('course-img').src = courseData.image;
    document.getElementById('course-name').textContent = courseData.name;
    document.getElementById('course-description').textContent = courseData.description;
    const price = courseData.price == 0 ? 'Free' : "$" + courseData.price;
    document.getElementById('course-price').textContent = price;

}

function changeImg() {
    let randomNum = Math.floor(Math.random() * 10) + 1;
    let $courseImg = $('#course-img');

    // fade out the current image
    $courseImg.fadeOut('slow', function () {
        // change the image source
        $courseImg.attr('src', jsonData[randomNum].image);

        // fade in the new image
        $courseImg.fadeIn('slow');
    });
}
