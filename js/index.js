$(document).ready(function() {
    // Load the JSON data
    $.getJSON('reviews.json', function(data) {
        // Initialize the review index and the review count
        var index = 0;
        var count = data.reviews.length;

        // Set the initial review data
        var reviewData = data.reviews[index];
        $('#review-name').text(reviewData.name);
        $('#review-image').attr('src', reviewData.image);
        $('#review-text').text(reviewData.review);

        // Loop through the reviews every second
        setInterval(function() {
            // Increment the review index and wrap around if necessary
            index = (index + 1) % count;

            // Get the review data at the current index
            reviewData = data.reviews[index];

            // Fade out the div and update the review data
            $('#review-container').fadeOut('slow', function() {
                $('#review-name').text(reviewData.name);
                $('#review-image').attr('src', reviewData.image);
                $('#review-text').text(reviewData.review);

                // Fade in the div
                $(this).fadeIn('slow');
            });
        }, 3000);
    });

    var tagline = $('#tagline');

    // Get the original text
    var originalText = tagline.text();

    // Define the animation properties
    var animationProperties = {
        opacity: 0,
        top: "+=50px",
    };

    // Define the animation options
    var animationOptions = {
        complete: function() {
            // Animation complete
            tagline.animate({
                opacity: 0.9,
                top: "-=50px",
            }, 500, function() {
                // Animation complete
                tagline.text(originalText);
            });
        }
    };

    // Start the animation loop
    setInterval(function() {
        // Animate the text
        tagline.animate(animationProperties, animationOptions);

        // Swap the text


        animationProperties.top = "-=50px";
    }, 2000); // Repeat every 3 seconds
});

