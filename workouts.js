document.addEventListener("DOMContentLoaded", function () {
    // Age selector functionality
    const ageButtons = document.querySelectorAll(".age-btn");
    const workoutContents = document.querySelectorAll(".workout-content");
  
    ageButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons and contents
        ageButtons.forEach((btn) => btn.classList.remove("active"));
        workoutContents.forEach((content) => content.classList.remove("active"));
  
        // Add active class to clicked button
        this.classList.add("active");
  
        // Show corresponding content
        const ageGroup = this.getAttribute("data-age");
        document.getElementById(ageGroup).classList.add("active");
  
        // Scroll to the content
        document.getElementById(ageGroup).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  
    // Back to top button functionality
    const backToTopButton = document.querySelector(".back-to-top");
  
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });
  
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });
  
  // Modal functionality for when accessed from the main page
  function openWorkoutModal() {
    document.querySelector(".workout-modal").style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
  }
  
  function closeWorkoutModal() {
    document.querySelector(".workout-modal").style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  }
  
  // Close modal if clicked outside content
  document.addEventListener("click", function (event) {
    const modal = document.querySelector(".workout-modal");
    const modalContent = document.querySelector(".workout-modal-content");
  
    if (modal && event.target === modal) {
      closeWorkoutModal();
    }
  });
  
  // Close modal with escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeWorkoutModal();
    }
  });
  