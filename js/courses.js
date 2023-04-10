// Load JSON data from courses.json file

displayFilteredData();

const freeCourses = document.querySelector('#flexSwitchCheckDefault');
freeCourses.addEventListener('click', function() {
    displayFilteredData();
});

function isFreeOnlyChecked(){
    return document.getElementById("flexSwitchCheckDefault").checked;
}

function getSearchText(){
    return searchInput.value.toLowerCase();
}



// Get reference to search input element
const searchInput = document.getElementById("search-course");

// Add event listener to search input element
searchInput.addEventListener("keyup", (event) => {
    // Get search term from input value and convert to lowercase
    const searchTerm = event.target.value.toLowerCase();
    displayFilteredData();
});

function displayFilteredData() {
    fetch("courses.json")
        .then((response) => response.json())
        .then((data) => {
            const searchTerm = getSearchText();
            // Filter courses based on search term
            let filteredData = data.filter((course) => course.name.toLowerCase().includes(searchTerm) || course.description.toLowerCase().includes(searchTerm));
            if(isFreeOnlyChecked())
                filteredData = filteredData.filter((course) => course.price == 0);
            if (filteredData.length > 0) {
                // Display filtered data
                displayCourses(filteredData);
            } else {
                // Clear card row if there are no results
                const cardRow = document.getElementById("card-row");
                cardRow.innerHTML = "No courses found.";
            }
        })
        .catch((error) => console.error(error));
}

function displayCourses(data){
    // Get reference to the card row element
    const cardRow = document.getElementById("card-row");

    // Clear card row before displaying new data
    cardRow.innerHTML = "";

    // Loop through each item in the JSON data
    data.forEach((item) => {
        // Create a new card element
        const card = document.createElement("div");
        card.classList.add("col-md-6");
        card.classList.add("col-sm-8");
        card.classList.add("col-lg-3");
        card.classList.add("bg-gradient");
        card.classList.add("m-2");
        card.classList.add("p-0");
        card.classList.add("rounded");
        card.classList.add("overflow-hidden");

        // Add card content
        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.src = item.image;
        image.alt = item.name;
        const cardBody = document.createElement("div");
        cardBody.classList.add("p-1");
        const cardTitle = document.createElement("p");
        cardTitle.classList.add("text-white");
        cardTitle.classList.add("font-weight-bold");
        cardTitle.innerText = item.name;
        const cardText = document.createElement("p");
        cardText.classList.add("text-muted");
        cardText.innerText = item.description;

// Set max-height to the height of 3 lines
        cardText.style.maxHeight = "3em";

// Set overflow to hidden to hide the rest of the text
        cardText.style.overflow = "hidden";
        const line = document.createElement("hr");
        line.classList.add("hr");
        const cardPrice = document.createElement("p");
        cardPrice.classList.add("card-price");
        cardPrice.classList.add("text-center");
        let originalPrice = item.price;
        let discountedPrice = parseInt(originalPrice) + (originalPrice * 0.1);
        let priceText = `<del>$${discountedPrice}</del> $${originalPrice}`;

        if(originalPrice == 0)
            priceText = 'Free'
        cardPrice.innerHTML = priceText;

        // Append card content to card element
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(line);
        cardBody.appendChild(cardPrice);
        card.appendChild(image);
        card.appendChild(cardBody);

        // Append card element to card row
        cardRow.appendChild(card);
        card.addEventListener("click", () => {
            // Redirect to new page with course details
            window.location.href = `product.html?id=${item.id}`;
        });
    });
}
