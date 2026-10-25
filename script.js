/* =========================================
   VANQ — INTERACTIVE EXPERIENCE
========================================= */

"use strict";


// -----------------------------------------
// 1. CINEMATIC INTRO
// -----------------------------------------

const intro = document.getElementById("cinematicIntro");
const skipButton = document.getElementById("skipIntro");

let introFinished = false;
let introTimer;

function finishIntro() {
    if (!intro || introFinished) {
        return;
    }

    introFinished = true;

    // Stop the automatic timer.
    window.clearTimeout(introTimer);

    // Fade out the intro.
    intro.classList.add("is-hidden");

    document.body.classList.remove("intro-active");

    // Remove the intro from keyboard navigation.
    if (skipButton) {
        skipButton.blur();
    }
}

// Lock scrolling while the intro is visible.
if (intro) {
    document.body.classList.add("intro-active");

    // Automatically reveal the homepage after 6.5 seconds.
    introTimer = window.setTimeout(finishIntro, 6500);
}

// Let visitors skip the animation.
if (skipButton) {
    skipButton.addEventListener("click", finishIntro);
}

// Allow Escape to skip the intro.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        finishIntro();
    }
});


// -----------------------------------------
// 2. AUTOMATIC COPYRIGHT YEAR
// -----------------------------------------

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// -----------------------------------------
// 3. ANIMATED SCROLL REVEALS
// -----------------------------------------

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    // Fallback for older browsers.
    revealElements.forEach(function (element) {
        element.classList.add("is-visible");
    });
}


// -----------------------------------------
// 4. MOBILE NAVIGATION
// -----------------------------------------

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    // Close the menu after selecting a section.
    const navigationLinks = navLinks.querySelectorAll("a");

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        });
    });
}


// -----------------------------------------
// 5. INTERACTIVE HERO DEPTH EFFECT
// -----------------------------------------

const hero = document.querySelector(".hero");
const heroVisual = document.getElementById("heroVisual");
const heroTitle = document.getElementById("heroTitle");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
);

if (
    hero &&
    heroVisual &&
    heroTitle &&
    !prefersReducedMotion.matches &&
    hasFinePointer.matches
) {
    hero.addEventListener("pointermove", function (event) {
        const bounds = hero.getBoundingClientRect();

        const relativeX =
            (event.clientX - bounds.left) / bounds.width - 0.5;

        const relativeY =
            (event.clientY - bounds.top) / bounds.height - 0.5;

        // Move the visual slightly in response to the pointer.
        heroVisual.style.transform =
            "translateY(-50%) " +
            "rotateY(" + relativeX * 8 + "deg) " +
            "rotateX(" + relativeY * -8 + "deg)";

        // Give the heading a subtle depth effect.
        heroTitle.style.transform =
            "perspective(900px) " +
            "rotateY(" + relativeX * 2 + "deg) " +
            "rotateX(" + relativeY * -2 + "deg)";
    });

    hero.addEventListener("pointerleave", function () {
        heroVisual.style.transform = "translateY(-50%)";
        heroTitle.style.transform = "none";
    });
}


// -----------------------------------------
// 6. CONSOLE MESSAGE
// -----------------------------------------

console.log("VANQ experience initialized successfully.");