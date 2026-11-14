
/* ==========================================
   JAI MAA PITAMBARA - ANIMATION SYSTEM
========================================== */

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const preloader = document.querySelector(".preloader");
const progress = document.querySelector(".loader-progress");
const percent = document.querySelector(".loader-percent");

function startWebsite() {

    if (reduceMotion) {
        preloader?.remove();
        return;
    }

    const counter = { value: 0 };

    gsap.to(counter, {
        value: 100,
        duration: 1.3,
        ease: "power2.inOut",
        onUpdate: () => {
            if (percent) {
                percent.textContent = String(
                    Math.round(counter.value)
                ).padStart(2, "0");
            }

            if (progress) {
                gsap.set(progress, {
                    width: counter.value + "%"
                });
            }
        },
        onComplete: () => {

            const intro = gsap.timeline();

            intro.to(preloader, {
                yPercent: -100,
                duration: 0.9,
                ease: "power4.inOut"
            });

            intro.from(".topbar", {
                y: -25,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out"
            }, "-=0.3");

            intro.from(".sidebar", {
                x: -20,
                opacity: 0,
                duration: 0.7
            }, "-=0.5");

            intro.from(".section-heading", {
                y: 25,
                opacity: 0,
                duration: 0.7
            }, "-=0.35");

            intro.from(".product-card", {
                y: 45,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.35");

            intro.from(".featured-copy > *", {
                y: 30,
                opacity: 0,
                stagger: 0.12,
                duration: 0.7
            }, "-=0.25");

            intro.from(".featured-visual", {
                x: 35,
                opacity: 0,
                duration: 1
            }, "-=0.7");

            intro.set(preloader, {
                display: "none"
            });
        }
    });
}

/* WAIT FOR PAGE ASSETS */

if (document.readyState === "complete") {
    startWebsite();
} else {
    window.addEventListener("load", startWebsite, {
        once: true
    });
}

/* SCROLL REVEALS */

if (!reduceMotion) {

    gsap.utils.toArray(".services-strip, .contact-section, .footer")
        .forEach((element) => {

            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 88%",
                    once: true
                },
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out"
            });

        });

    /* PRODUCT CARD SCROLL ANIMATION */

    gsap.utils.toArray(".product-card").forEach((card) => {

        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

    });

    /* FEATURED IMAGE PARALLAX */

    gsap.to(".visual-image img", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
            trigger: ".featured-visual",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });

}

/* SMOOTH ANCHOR NAVIGATION */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function(event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start"
        });

    });

});


















document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.querySelector(".preloader");
    const intro = document.querySelector(".intro-content");
    const introLine = document.querySelector(".intro-line");
    const website = document.querySelector(".website-frame");

    if (!preloader || !website || !window.gsap) {
        if (preloader) preloader.remove();
        return;
    }

    // Initial website state
    gsap.set(website, {
        opacity: 0,
        y: 25
    });

    // Intro animation
    const tl = gsap.timeline({
        onComplete: () => {
            preloader.remove();
        }
    });

    tl.to(introLine, {
        width: "100%",
        duration: 0.7,
        ease: "power2.inOut"
    })

    .to(intro, {
        scale: 0.65,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut"
    }, "+=0.4")

    .to(preloader, {
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut"
    }, "-=0.25")

    .to(website, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.5");
});





























document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
        ".intro-grid > *, .section-heading, .product-card, " +
        ".statement-section .eyebrow, .statement-section h2, " +
        ".statement-bottom, .service-item, .contact-section > *"
    );

    revealElements.forEach((element) => {
        element.classList.add("scroll-reveal");
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach((element) => observer.observe(element));
});


















const horizontalSection = document.querySelector(".horizontal-scroll");
const horizontalTrack = document.querySelector(".horizontal-track");

function updateHorizontalScroll() {
    if (window.innerWidth <= 700) {
        horizontalTrack.style.transform = "none";
        return;
    }

    const sectionTop = horizontalSection.offsetTop;
    const scrollDistance =
        horizontalSection.offsetHeight - window.innerHeight;

    const progress = Math.max(
        0,
        Math.min(
            1,
            (window.scrollY - sectionTop) / scrollDistance
        )
    );

    horizontalTrack.style.transform =
        `translateX(-${progress * 50}%)`;
}

window.addEventListener("scroll", updateHorizontalScroll);
window.addEventListener("resize", updateHorizontalScroll);

updateHorizontalScroll();
















/* ==========================================
   PREMIUM TEXT ANIMATIONS
   Add at the END of your existing JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    // HERO HEADING - elegant entrance
    gsap.from(".hero-heading", {
        y: 65,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power4.out"
    });

    // BLUE TEXT ACCENT
    gsap.from(".hero-heading span", {
        y: 25,
        opacity: 0,
        duration: 1,
        delay: 0.7,
        ease: "power3.out"
    });

    // HERO DESCRIPTION
    gsap.from(".hero-description", {
        y: 25,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
    });

    // SECTION HEADINGS - reveal on scroll
    gsap.utils.toArray(
        ".intro-grid h2, .section-heading h2, .statement-section h2, .contact-section h2"
    ).forEach((heading) => {

        gsap.from(heading, {
            y: 55,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                once: true
            }
        });

    });

    // PARAGRAPHS - subtle staggered reveal
    gsap.utils.toArray(
        ".intro-description p, .contact-section > p, .statement-bottom p"
    ).forEach((paragraph) => {

        gsap.from(paragraph, {
            y: 25,
            opacity: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
                trigger: paragraph,
                start: "top 90%",
                once: true
            }
        });

    });

    // SERVICE TITLES
    gsap.utils.toArray(".service-item h3").forEach((title) => {

        gsap.from(title, {
            x: -25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
                once: true
            }
        });

    });

});
