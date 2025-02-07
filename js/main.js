// FADE TRANSITION
document.addEventListener("DOMContentLoaded", () => {
    // Add fade-in effect when page loads
    document.body.classList.add("show");

    // Add fade-out effect on link clicks
    document.querySelectorAll(".button-link").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent instant navigation

            const href = link.getAttribute("href"); 
            document.body.classList.remove("show"); // Start fade-out
            
            setTimeout(() => {
                window.location.href = href; // Navigate after fade-out
            }, 200); // Match CSS transition duration
        });
    });
});

// SCROLL TO TOP
document.querySelector('#anchor-up').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Enables smooth scrolling
    });
});

// NAV
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");
    const activeBg = document.querySelector("#nav-background");

    function moveActiveBg(target) {
        const { offsetLeft, offsetWidth } = target;
        activeBg.style.width = `${offsetWidth}px`;
        activeBg.style.transform = `translateX(${offsetLeft}px)`;
    }

    // Initialize background position on page load
    const activeItem = document.querySelector(".nav-item.active");
    if (activeItem) moveActiveBg(activeItem);

    // Add click event to each nav item
    navItems.forEach((item) => {
        item.addEventListener("click", function () {
            // Remove active class from all items
            navItems.forEach((nav) => nav.classList.remove("active"));

            // Add active class to the clicked item
            this.classList.add("active");

            // Move the background
            moveActiveBg(this);
        });
    });
});

// CUSTOM CURSOR
// Select the custom cursor element
const cursor = document.querySelector('.custom-cursor');

// Update the cursor's position on mouse move
document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
});

// Optional: Add hover effects for links or buttons
document.querySelectorAll('a, button, input, .nav-item, .indicator, video').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add("active-cursor");
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove("active-cursor");
    });
});


// NAV SLIDER
// Get all nav items and sections
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content');
const sectionOrder = ["work", "side-projects", "others", "about-me"];
let previousActive = "work"; // Default active section

// Hide all inactive sections on page load
document.addEventListener('DOMContentLoaded', () => {
    sections.forEach((section) => {
        if (section.classList.contains('inactive-right') || section.classList.contains('inactive-left')) {
            section.style.display = 'none';
        }
    });
});

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target'); // Get the target section

        if (target === previousActive) return; // Do nothing if clicking the active section

        sections.forEach((section) => {
            if (section.classList.contains(target)) {
                // Remove any existing inactive classes immediately
                section.classList.remove('inactive-left', 'inactive-right');

                // Determine entering direction
                let enteringDirection = "";
                if (target === "work" && ["side-projects", "others", "about-me"].includes(previousActive)) {
                    enteringDirection = "entering-left";
                } else if (target === "side-projects") {
                    enteringDirection = (previousActive === "work") ? "entering-right" : "entering-left";
                } else if (target === "others") {
                    enteringDirection = (["work", "side-projects"].includes(previousActive)) ? "entering-right" : "entering-left";
                } else if (target === "about-me") {
                    enteringDirection = "entering-right";
                }

                // Add entering class immediately
                section.classList.add(enteringDirection);

                // Show target section after 0.2s
                setTimeout(() => {
                    section.style.display = 'flex';
                }, 200);

                // Add "active" class after 0.3s
                setTimeout(() => {
                    section.classList.add('active');
                    section.classList.remove(enteringDirection); // Remove entering class after activation
                }, 300);
            } else if (section.classList.contains(previousActive)) {
                // Determine slide direction based on order
                const prevIndex = sectionOrder.indexOf(previousActive);
                const targetIndex = sectionOrder.indexOf(target);
                const slideDirection = prevIndex < targetIndex ? "inactive-left" : "inactive-right";

                section.classList.remove('active');
                section.classList.add(slideDirection);

                // Hide section after 0.2s
                setTimeout(() => {
                    section.style.display = 'none';
                }, 200);
            }
        });

        previousActive = target; // Update previous active section
    });
});

// PASSWORD
const modal = document.getElementById("password-overlay");
const inputs = document.querySelectorAll(".password-input");
const errorMessage = document.getElementById("error-message");
const body = document.body;
const correctPassword = "ABC123"; // Change this to your actual password

function openModal() {
    modal.classList.add("show");
    body.classList.add("no-scroll");
    setTimeout(() => {
        inputs[0].focus(); // Ensure the first input gets focus after animation
    }, 200); // Delay matches the transition time (0.2s)
}

function closeModal(event) {
    event.preventDefault(); // Prevent link navigation
    modal.classList.remove("show");
    body.classList.remove("no-scroll"); // Restore scrolling

    setTimeout(() => {
        inputs.forEach(input => input.value = ""); // Clear inputs
        errorMessage.classList.remove("show"); // Hide error message
    }, 200);
}

// Handle input behavior
inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        e.target.value = e.target.value.toUpperCase(); // Force uppercase

        if (e.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus(); // Move to next input
        }

        // Automatically submit when last character is entered
        if (index === inputs.length - 1 && e.target.value.length === 1) {
            setTimeout(checkPassword, 0); // 0.5s delay before checking
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && index > 0 && !e.target.value) {
            inputs[index - 1].focus(); // Move back on delete
        }
    });
});

function checkPassword() {
    const enteredPassword = Array.from(inputs).map(input => input.value).join('');
    if (enteredPassword === correctPassword) {
        inputs.forEach(input => input.classList.add("success")); // Add success class

        setTimeout(() => {
            alert("Access Granted!");
            closeModal({ preventDefault: () => { } }); // Close modal safely
            inputs.forEach(input => input.classList.remove("success"));
        }, 500);
    } else {
        errorMessage.classList.add("show"); // Show error message
        inputs.forEach(input => input.classList.add("error")); // Add error class

        setTimeout(() => {
            errorMessage.classList.remove("show"); // Hide after 2s
            inputs.forEach(input => input.classList.remove("error")); // Remove error class
        }, 1200);

        // Clear inputs and refocus
        setTimeout(() => {
            inputs.forEach(input => input.value = "");
            inputs[0].focus();
        }, 1200);
    }
}

// CAROUSEL

const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel-slide");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const indicatorsContainer = document.querySelector(".indicators");
const carouselWidth = document.querySelector(".carousel-container").offsetWidth;

let currentIndex = 0;

function updateCarousel() {
    const offset = currentIndex * (100 + (32 / carouselWidth * 100)); // Adjust for gap
    carousel.style.transform = `translateX(-${offset}%)`;
    updateIndicators();
}

function updateIndicators() {
    document.querySelectorAll(".indicator").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

function createIndicators() {
    images.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("indicator");
        if (index === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });
        indicatorsContainer.appendChild(dot);
    });
}

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateCarousel();
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

createIndicators();

// GRADIENT SCROLL (TEXT)
document.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    document.querySelectorAll(".gradient-text").forEach((element, index) => {
        // Adjust gradient movement based on scroll position
        const gradientShift = ((scrollPos / window.innerHeight) * 100) + (index * 10); 
        element.style.backgroundPosition = `${gradientShift}% center`;
    });
});

// MEDIA PLAYER

/* document.querySelectorAll(".custom-play").forEach((button) => {
    button.addEventListener("click", () => {
      const placeholder = button.previousElementSibling; // Get the placeholder div
      const mediaContainer = placeholder.querySelector(".media-container"); // Get the iframe container
      const videoId = mediaContainer.getAttribute('data-src'); // Get the video ID
  
      // Set the iframe's src dynamically to autoplay the video
      mediaContainer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1`;
  
      // Show the iframe player
      mediaContainer.style.display = 'block';
  
      // Fade out the play button
      button.classList.add("hidden");
  
      // Remove the thumbnail background
      placeholder.style.background = "none";
  
      // Listen for the video to end (check for `ended` event)
      mediaContainer.onload = function () {
        mediaContainer.contentWindow.addEventListener('unload', function() {
          resetPlayer(placeholder, button, mediaContainer, videoId);
        });
      };
    });
  });
  
  // Reset the player when the video ends
  function resetPlayer(placeholder, button, mediaContainer, videoId) {
    // Hide the iframe after the video ends
    mediaContainer.style.display = 'none';
  
    // Show the placeholder (thumbnail) and play button again
    placeholder.style.backgroundImage = `url('https://img.youtube.com/vi/${videoId}/maxresdefault.jpg')`;
    button.classList.remove("hidden"); // Show the play button again
  } */