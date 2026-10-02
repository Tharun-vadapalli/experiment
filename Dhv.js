document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       THEME
    ========================================= */

    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    function updateThemeButton() {

        if (!themeToggle) return;

        const isLight =
            root.classList.contains("light-mode");

        themeToggle.textContent =
            isLight ? "â˜€ï¸" : "ðŸŒ™";

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );
    }


    const savedTheme =
        localStorage.getItem("dhv-theme");

    if (savedTheme === "light") {
        root.classList.add("light-mode");
    }


    updateThemeButton();


    themeToggle?.addEventListener(
        "click",
        () => {

            const isLight =
                root.classList.toggle("light-mode");

            localStorage.setItem(
                "dhv-theme",
                isLight ? "light" : "dark"
            );

            updateThemeButton();

        }
    );



    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");


    function closeMenu() {

        mainNav?.classList.remove("active");

        menuToggle?.classList.remove("active");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    function toggleMenu() {

        if (!mainNav) return;

        const isOpen =
            mainNav.classList.toggle("active");

        menuToggle?.classList.toggle(
            "active",
            isOpen
        );

        menuToggle?.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    }


    window.toggleMenu = toggleMenu;


    menuToggle?.addEventListener(
        "click",
        toggleMenu
    );


    document
        .querySelectorAll(".main-nav a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    document.addEventListener(
        "click",
        event => {

            if (
                !mainNav ||
                !menuToggle
            ) {
                return;
            }


            if (
                mainNav.classList.contains("active") &&
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                closeMenu();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );



    /* =========================================
       WHATSAPP
    ========================================= */

    window.openWhatsApp =
        function (message = "") {

            const url =
                `https://wa.me/919347592976?text=${encodeURIComponent(message)}`;

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        };


    window.enquireProduct =
        function (productName = "") {

            openWhatsApp(
                `Hello DHV Books & Accessories, I would like to enquire about: ${productName}`
            );

        };



    /* =========================================
       PRODUCT FILTER
    ========================================= */

    window.filterProducts =
        function (category, button) {

            const cards =
                document.querySelectorAll(
                    ".product-card"
                );

            const buttons =
                document.querySelectorAll(
                    ".filter-btn"
                );


            buttons.forEach(btn => {
                btn.classList.remove("active");
            });


            if (button) {
                button.classList.add("active");
            }


            cards.forEach(card => {

                const cardCategory =
                    card.dataset.category || "";


                const show =
                    category === "all" ||
                    cardCategory === category;


                card.style.display =
                    show ? "" : "none";

            });

        };



    /* =========================================
       CONTACT / ENQUIRY FORM
    ========================================= */

    const enquiryForm =
        document.getElementById("enquiryForm");


    enquiryForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById("customerName")
                    ?.value
                    .trim() || "";


            const phone =
                document
                    .getElementById("customerPhone")
                    ?.value
                    .trim() || "";


            const category =
                document
                    .getElementById("customerCategory")
                    ?.value
                    .trim() || "";


            const message =
                document
                    .getElementById("customerMessage")
                    ?.value
                    .trim() || "";


            if (
                !name ||
                !phone ||
                !category ||
                !message
            ) {

                alert(
                    "Please fill in all the required fields."
                );

                return;

            }


            const whatsappMessage =
                `Hello DHV Books & Accessories,\n\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Requirement: ${category}\n` +
                `Message: ${message}`;


            openWhatsApp(
                whatsappMessage
            );

        }
    );



    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("visible");

                                obs.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    const header =
        document.querySelector(
            ".site-header"
        );


    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 10
        );

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();



    /* =========================================
       CURRENT YEAR
    ========================================= */

    const year =
        document.getElementById(
            "currentYear"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }



    /* =========================================
       IMAGE ERROR HANDLING
    ========================================= */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.style.opacity =
                        "0.35";

                    img.alt =
                        "Image unavailable";

                }
            );

        });



    /* =========================================
       BACK TO TOP
    ========================================= */

    const backTop =
        document.createElement(
            "button"
        );


    backTop.type = "button";

    backTop.className =
        "back-to-top";

    backTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    backTop.setAttribute(
        "title",
        "Back to top"
    );

    backTop.innerHTML = "â†‘";


    document.body.appendChild(
        backTop
    );


    function updateBackTop() {

        backTop.classList.toggle(
            "show",
            window.scrollY > 500
        );

    }


    window.addEventListener(
        "scroll",
        updateBackTop,
        {
            passive: true
        }
    );


    updateBackTop();


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );



    /* =========================================
       SMOOTH INTERNAL LINKS
    ========================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });



    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    document
        .querySelectorAll(
            ".main-nav a"
        )
        .forEach(link => {

            const linkPage =
                link
                    .getAttribute("href")
                    ?.split("/")
                    .pop();


            if (
                linkPage === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        });



    /* =========================================
       PHONE NUMBER VALIDATION
    ========================================= */

    const phoneInputs =
        document.querySelectorAll(
            'input[type="tel"]'
        );


    phoneInputs.forEach(input => {

        input.addEventListener(
            "input",
            () => {

                input.value =
                    input.value.replace(
                        /[^0-9+\-\s()]/g,
                        ""
                    );

            }
        );

    });



    /* =========================================
       BUTTON LOADING EFFECT
    ========================================= */

    document
        .querySelectorAll(
            ".btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.add(
                        "clicked"
                    );


                    setTimeout(
                        () => {

                            button.classList.remove(
                                "clicked"
                            );

                        },
                        250
                    );

                }
            );

        });



    /* =========================================
       YEAR-SAFE WHATSAPP LINKS
    ========================================= */

    document
        .querySelectorAll(
            'a[href*="wa.me"]'
        )
        .forEach(link => {

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });

});
