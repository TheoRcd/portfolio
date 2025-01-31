// Scroll to Top
document.querySelector('#anchor-up').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Enables smooth scrolling
    });
  });

// Nav
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

// Cursor
// Select the custom cursor element
const cursor = document.querySelector('.custom-cursor');

// Update the cursor's position on mouse move
document.addEventListener('mousemove', (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

// Optional: Add hover effects for links or buttons
document.querySelectorAll('a, button, input, .nav-item').forEach((element) => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add("active-cursor");
  });
  element.addEventListener('mouseleave', () => {
   cursor.classList.remove("active-cursor");
  });
});

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

// PASSWORD //
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
                    closeModal({ preventDefault: () => {} }); // Close modal safely
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