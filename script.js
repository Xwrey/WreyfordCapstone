document.addEventListener("DOMContentLoaded", function () {
  var nav = document.querySelector("nav");
  var header = document.querySelector(".page-header") || document.querySelector(".hero");

  if (nav && header) {
    window.addEventListener("scroll", function () {
      var headerBottom = header.offsetTop + header.offsetHeight;
      if (window.scrollY >= headerBottom) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    });
  }

  var serviceSlides = document.querySelectorAll(".service-slide");
  var prevService = document.getElementById("prev-service");
  var nextService = document.getElementById("next-service");
  var currentSlide = 0;
  var slideTimer;

  function showSlide(slideNumber) {
    for (var i = 0; i < serviceSlides.length; i++) {
      serviceSlides[i].classList.remove("active");
    }

    currentSlide = slideNumber;

    if (currentSlide < 0) {
      currentSlide = serviceSlides.length - 1;
    } else if (currentSlide >= serviceSlides.length) {
      currentSlide = 0;
    }

    serviceSlides[currentSlide].classList.add("active");
  }

  if (serviceSlides.length > 0 && prevService && nextService) {
    slideTimer = setInterval(function () {
      showSlide(currentSlide + 1);
    }, 4000);

    prevService.addEventListener("click", function () {
      clearInterval(slideTimer);
      showSlide(currentSlide - 1);
    });

    nextService.addEventListener("click", function () {
      clearInterval(slideTimer);
      showSlide(currentSlide + 1);
    });
  }

  var contactForm = document.getElementById("contact-form");
  var contactFeedback = document.getElementById("contact-feedback");

  if (contactForm && contactFeedback) {
    contactForm.addEventListener("submit", function (event) {
      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var message = document.getElementById("message").value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var errorMessage = "";

      if (name.length < 2) {
        errorMessage = "Please enter your name. It should be at least 2 characters.";
      } else if (!emailPattern.test(email)) {
        errorMessage = "Please enter a valid email address.";
      } else if (message.length < 10) {
        errorMessage = "Please enter a message that is at least 10 characters.";
      }

      if (errorMessage !== "") {
        event.preventDefault();
        contactFeedback.textContent = errorMessage;
        contactFeedback.className = "feedback-message error";
      } else {
        contactFeedback.textContent = "Thanks! Your message looks good and is ready to send.";
        contactFeedback.className = "feedback-message success";
        alert("Thanks! Your message looks good and is ready to send.");
      }
    });
  }

  var recommendButton = document.getElementById("recommend-button");
  var sessionNeed = document.getElementById("session-need");
  var recommendationResult = document.getElementById("recommendation-result");

  if (recommendButton && sessionNeed && recommendationResult) {
    recommendButton.addEventListener("click", function () {
      var sessionTitle = "";
      var sessionLength = "";
      var sessionPrice = "";
      var sessionReason = "";

      if (sessionNeed.value === "unsure") {
        sessionTitle = "Free Diagnostic Session";
        sessionLength = "15 minutes";
        sessionPrice = "Free";
        sessionReason = "Best choice when you want help figuring out what to study first.";
      } else if (sessionNeed.value === "homework") {
        sessionTitle = "30-Minute Homework Help";
        sessionLength = "30 minutes";
        sessionPrice = "$25";
        sessionReason = "Great for working through a few homework problems or clearing up one topic.";
      } else if (sessionNeed.value === "exam") {
        sessionTitle = "60-Minute Exam Prep";
        sessionLength = "60 minutes";
        sessionPrice = "$45";
        sessionReason = "Better for reviewing multiple topics, practice problems, and study strategy.";
      } else if (sessionNeed.value === "debugging") {
        sessionTitle = "60-Minute Code Debugging";
        sessionLength = "60 minutes";
        sessionPrice = "$45";
        sessionReason = "Gives us time to trace the bug, explain the fix, and prevent similar errors.";
      }

      recommendationResult.innerHTML =
        "<h3>Recommended Session</h3>" +
        "<p><strong>" + sessionTitle + "</strong></p>" +
        "<p>Length: " + sessionLength + "</p>" +
        "<p>Price: " + sessionPrice + "</p>" +
        "<p>" + sessionReason + "</p>" +
        '<p><a href="book.html" class="btn">Book Now</a></p>';
      recommendationResult.className = "feedback-message success recommendation-card";
    });
  }
});
