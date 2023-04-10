const courseId = new URLSearchParams(window.location.search).get('id');
getCourseData(courseId);

let jsonData;
function getCourseData(id){
    fetch("courses.json")
        .then((response) => response.json())
        .then((data) => {
            jsonData = data;
            const course = data.filter((course)=> course.id == id);
            console.log(course);
            displayCourse(course[0]);
        })
}

function addToCart() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
    }
    const cartItems = JSON.parse(localStorage.getItem('carts')) || {};
    const userCart = cartItems[loggedInUser.email] || [];
    userCart.push(courseId);
    cartItems[loggedInUser.email] = userCart;
    localStorage.setItem('carts', JSON.stringify(cartItems));
    console.log(userCart);
}

function displayCourse(courseData){
    document.getElementById('course-img').src = courseData.image;
    document.getElementById('course-name').textContent = courseData.name;
    document.getElementById('course-description').textContent = courseData.description;
    const price = courseData.price == 0 ?'Free':"$"+courseData.price;
    document.getElementById('course-price').textContent = price;

    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        // Add to cart functionality

    });
}

function changeImg() {
    let randomNum = Math.floor(Math.random() * 10) + 1;
    let $courseImg = $('#course-img');

    // fade out the current image
    $courseImg.fadeOut('slow', function() {
        // change the image source
        $courseImg.attr('src', jsonData[randomNum].image);

        // fade in the new image
        $courseImg.fadeIn('slow');
    });
}
