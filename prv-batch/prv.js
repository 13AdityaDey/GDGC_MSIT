// NAVIGATION BAR //
const menubar = document.querySelector('#menubar');
const sidebar = document.querySelector('.sidebar');
const closeIcon = sidebar.querySelector('#closeBtn');

menubar.addEventListener('click', () => {
    sidebar.style.display = 'flex';
});

closeIcon.addEventListener('click', () => {
    sidebar.style.display = 'none';
});

const navLinks = document.querySelectorAll('nav li a');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(nav => nav.classList.remove('active')); 
        this.classList.add('active'); 
    });
});

// SLIDER //
const sliders = document.querySelectorAll(".slider-container");

sliders.forEach((slider) => {
    const carousel = slider.querySelector(".cards-wrapper");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = slider.querySelectorAll(".arrow");
    const carouselChildrens = [...carousel.children];

    let isDragging = false, startX, startScrollLeft;

    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    const infiniteScroll = () => {
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
});