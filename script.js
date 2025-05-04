// Simple animation on page load
window.onload = () => {
    const heading = document.querySelector(".logo");
  
    // Set initial styles (before animation starts)
    heading.style.opacity = "0";
    heading.style.transform = "translateY(50px) scale(0.9)";
  
    // Force reflow to apply initial styles before transition starts
    void heading.offsetWidth;
  
    // Apply animated styles
    heading.style.transition = "all 1.5s ease-out";
    heading.style.opacity = "1";
    heading.style.transform = "translateY(0) scale(1)";
  
    document.querySelector(".hero-left h1").style.transform = "scale(1.05)";
    document.querySelector(".hero-left h1").style.transition = "2.5s ease";
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("joinForm");
    const message = document.getElementById("message");
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // stops the form from submitting
      message.classList.remove("hidden");
    });
  });
  const galleryData = [
    {
      id: 1,
      title: "State-of-the-art Cardio Area",
      category: "gym",
      imageUrl:
        "https://i.pinimg.com/474x/25/f6/ab/25f6ab2ca2534249e1d8b777525d19dc.jpg",
      description:
        "Our premium cardio area features top-of-the-line equipment with personal entertainment systems.",
    },
    {
      id: 2,
      title: "Luxury Weight Training Zone",
      category: "gym",
      imageUrl:
        "https://i.pinimg.com/474x/72/3b/f9/723bf910e99fedb68522a7359d52f085.jpg",
      description:
        "Custom-designed weight training area with premium equipment for optimal workouts.",
    },
    {
      id: 3,
      title: "Executive Yoga Studio",
      category: "classes",
      imageUrl:
        "https://i.pinimg.com/736x/c3/1b/1c/c31b1ceada74bdd968a3fb895cf99c08.jpg",
      description:
        "Serene yoga studio with natural lighting and premium amenities.",
    },
    {
      id: 4,
      title: "Indoor Olympic Pool",
      category: "spa",
      imageUrl:
        "https://i.pinimg.com/474x/3a/b9/ed/3ab9eda7c9e4632dcb2910f61b0286f6.jpg",
      description:
        "Temperature-controlled Olympic-sized pool with dedicated lap lanes.",
    },
    {
      id: 5,
      title: "Modern Equipment",
      category: "gym",
      imageUrl:
        "https://i.pinimg.com/474x/07/8b/51/078b51d74da81386dd93d0e51057a71d.jpg",
      description: "Advanced machinery for strength training.",
    },
    {
      id: 6,
      title: "Executive Locker Rooms",
      category: "spa",
      imageUrl:
        "https://i.pinimg.com/474x/b0/f6/1b/b0f61b3c1cc7d1cd36ed730ff7cba22b.jpg",
      description:
        "Spacious locker rooms with premium amenities and individual shower suites.",
    },
    {
      id: 7,
      title: "Boxing Area",
      category: "classes",
      imageUrl:
        "https://i.pinimg.com/474x/ac/6b/8f/ac6b8f306714c7d8c6d35a17e0dfc900.jpg",
      description: "Modern way to burn calories",
    },
    {
      id: 8,
      title: "Lower Body",
      category: "gym",
      imageUrl:
        "https://i.pinimg.com/474x/39/8b/19/398b19342f93ed83e20449feacbca599.jpg",
      description: "Seperate equipment section for lower body.",
    },
  ];
  
  // DOM elements
  const galleryContainer = document.querySelector(".gallery-container");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxCaption = document.querySelector(".img-caption");
  const closeLightbox = document.querySelector(".close-lightbox");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  
  // Current state
  let currentFilter = "all";
  let currentImageIndex = 0;
  let filteredGallery = [];
  
  // Initialize gallery
  document.addEventListener("DOMContentLoaded", () => {
    // Initial gallery load with animation delay
    loadGallery(galleryData);
  
    // Add click event to filter buttons
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"));
  
        // Add active class to clicked button
        btn.classList.add("active");
  
        // Get filter value
        const filter = btn.getAttribute("data-filter");
        currentFilter = filter;
  
        // Filter gallery items
        filterGallery(filter);
      });
    });
  
    // Lightbox controls
    closeLightbox.addEventListener("click", closeLightboxHandler);
    prevBtn.addEventListener("click", () => navigateGallery(-1));
    nextBtn.addEventListener("click", () => navigateGallery(1));
  
    // Close lightbox with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeLightboxHandler();
      } else if (e.key === "ArrowLeft") {
        navigateGallery(-1);
      } else if (e.key === "ArrowRight") {
        navigateGallery(1);
      }
    });
  
    // Add scroll reveal animation
    window.addEventListener("scroll", revealOnScroll);
  
    // Initial check for items in viewport
    revealOnScroll();
  });
  
  // Function to load gallery items
  function loadGallery(items) {
    galleryContainer.innerHTML = "";
  
    if (items.length === 0) {
      const noItemsMsg = document.createElement("div");
      noItemsMsg.className = "no-items-message";
      noItemsMsg.textContent = "No items found in this category";
      galleryContainer.appendChild(noItemsMsg);
      return;
    }
  
    filteredGallery = [...items];
  
    items.forEach((item, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";
      galleryItem.style.animationDelay = `${index * 0.1}s`;
      galleryItem.setAttribute("data-category", item.category);
      galleryItem.setAttribute("data-index", index);
  
      galleryItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}">
            <div class="item-overlay">
                <h3 class="item-title">${item.title}</h3>
                <p class="item-category">${capitalizeFirstLetter(
                  item.category
                )}</p>
            </div>
        `;
  
      galleryItem.addEventListener("click", () => {
        openLightbox(index);
      });
  
      galleryContainer.appendChild(galleryItem);
    });
  }
  
  // Function to filter gallery items
  function filterGallery(filter) {
    let filteredItems;
  
    if (filter === "all") {
      filteredItems = galleryData;
    } else {
      filteredItems = galleryData.filter((item) => item.category === filter);
    }
  
    // Fade out current items
    const currentItems = document.querySelectorAll(".gallery-item");
    currentItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
    });
  
    // Wait for animation to complete
    setTimeout(() => {
      loadGallery(filteredItems);
    }, 300);
  }
  
  // Function to open lightbox
  function openLightbox(index) {
    currentImageIndex = index;
    const item = filteredGallery[index];
  
    lightboxImg.src = item.imageUrl;
    lightboxCaption.textContent = `${item.title} - ${item.description}`;
    lightbox.style.display = "block";
  
    // Disable body scroll
    document.body.style.overflow = "hidden";
  
    // Add animation
    lightboxImg.style.opacity = "0";
    lightboxImg.style.transform = "scale(0.9)";
  
    setTimeout(() => {
      lightboxImg.style.opacity = "1";
      lightboxImg.style.transform = "scale(1)";
    }, 100);
  }
  
  // Function to close lightbox
  function closeLightboxHandler() {
    // Add animation
    lightboxImg.style.opacity = "0";
    lightboxImg.style.transform = "scale(0.9)";
  
    setTimeout(() => {
      lightbox.style.display = "none";
      // Re-enable body scroll
      document.body.style.overflow = "auto";
    }, 300);
  }
  
  // Function to navigate through gallery
  function navigateGallery(direction) {
    currentImageIndex =
      (currentImageIndex + direction + filteredGallery.length) %
      filteredGallery.length;
  
    // Add animation
    lightboxImg.style.opacity = "0";
    lightboxImg.style.transform =
      direction > 0 ? "translateX(50px)" : "translateX(-50px)";
  
    setTimeout(() => {
      const item = filteredGallery[currentImageIndex];
      lightboxImg.src = item.imageUrl;
      lightboxCaption.textContent = `${item.title} - ${item.description}`;
  
      lightboxImg.style.opacity = "1";
      lightboxImg.style.transform = "translateX(0)";
    }, 300);
  }
  
  // Helper function to capitalize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // Function to reveal items on scroll
  function revealOnScroll() {
    const galleryItems = document.querySelectorAll(".gallery-item");
  
    galleryItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
  
      if (itemTop < windowHeight - 100) {
        item.classList.add("visible");
      }
    });
  }
  
  // Add a luxury loading animation
  const loader = document.createElement("div");
  loader.className = "luxury-loader";
  loader.innerHTML = `
    <div class="loader-circle"></div>
    <div class="loader-text">Royal Fitness</div>
  `;
  document.body.appendChild(loader);
  
  // Remove loader after content is loaded
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 1000);
  });
  
  /*faq page*/
  document.addEventListener("DOMContentLoaded", function () {
    // Get all FAQ question elements
    const faqQuestions = document.querySelectorAll(".faq-question");
  
    // Add click event listener to each question
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        // Toggle active class on the question
        this.classList.toggle("active");
  
        // Get the answer element that follows this question
        const answer = this.nextElementSibling;
  
        // Toggle active class on the answer
        if (this.classList.contains("active")) {
          answer.classList.add("active");
        } else {
          answer.classList.remove("active");
        }
      });
    });
  
    // Optional: Add animation when page loads
    setTimeout(() => {
      document.querySelector(".page-title").style.opacity = "1";
      document.querySelector(".page-title").style.transform = "translateY(0)";
    }, 200);
  
    // Optional: Add smooth scrolling to any anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
  
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
  
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  });
  
  /*workout button*/
  document.addEventListener("DOMContentLoaded", function () {
    const viewWorkoutsBtn = document.getElementById("view-workouts-btn");
    const workoutModal = document.querySelector(".workout-modal");
    const closeModalBtn = document.querySelector(".close-modal");
  
    // Open modal when button is clicked
    viewWorkoutsBtn.addEventListener("click", function () {
      workoutModal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    });
  
    // Close modal when X is clicked
    closeModalBtn.addEventListener("click", function () {
      workoutModal.style.display = "none";
      document.body.style.overflow = "auto"; // Restore scrolling
    });
  
    // Close modal if clicked outside content
    window.addEventListener("click", function (event) {
      if (event.target === workoutModal) {
        workoutModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  
    // Close modal with escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        workoutModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });
  