document.querySelectorAll("[data-carousel]").forEach((carousel) => {

    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");

    const previousButton =
        carousel.querySelector(".carousel-button-prev");

    const nextButton =
        carousel.querySelector(".carousel-button-next");

    const dotsContainer =
        carousel.querySelector(".carousel-dots");

    const captions =
        carousel.querySelectorAll(".carousel-caption");

    let currentIndex = 0;

    const totalSlides = slides.length;

    let touchStartX = 0;
    let touchEndX = 0;

    /* Create dots */

    slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.type = "button";

        dot.classList.add("carousel-dot");

        dot.setAttribute(
            "aria-label",
            `Go to slide ${index + 1}`
        );

        dot.addEventListener("click", () => {
            goToSlide(index);
        });

        dotsContainer.appendChild(dot);

    });


    const dots =
        carousel.querySelectorAll(".carousel-dot");


    /* Change slide */

    function goToSlide(index) {

        currentIndex = index;

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === currentIndex
            );

        });

        captions.forEach((caption, captionIndex) => {

            caption.style.display =
                captionIndex === currentIndex ? "block" : "none";

        });

    }


    /* Next */

    function nextSlide() {

        const nextIndex =
            (currentIndex + 1) % totalSlides;

        goToSlide(nextIndex);

    }


    /* Previous */

    function previousSlide() {

        const previousIndex =
            (currentIndex - 1 + totalSlides) % totalSlides;

        goToSlide(previousIndex);

    }


    /* Buttons */

    nextButton.addEventListener(
        "click",
        nextSlide
    );

    previousButton.addEventListener(
        "click",
        previousSlide
    );


    /* Keyboard */

    carousel.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {
            nextSlide();
        }

        if (event.key === "ArrowLeft") {
            previousSlide();
        }

    });

    carousel.setAttribute("tabindex", "0");


    /* Touch / swipe */

    carousel.addEventListener("touchstart", (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    }, { passive: true });


    carousel.addEventListener("touchend", (event) => {

        touchEndX =
            event.changedTouches[0].screenX;

        const swipeDistance =
            touchEndX - touchStartX;


        if (swipeDistance < -50) {
            nextSlide();
        }

        if (swipeDistance > 50) {
            previousSlide();
        }

    }, { passive: true });


    /* Initial state */

    goToSlide(0);

});